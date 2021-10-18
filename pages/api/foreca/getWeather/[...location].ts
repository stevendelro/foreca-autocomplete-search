import type { NextApiRequest, NextApiResponse } from 'next'

import { HashTable } from '../../../../types/util'
import axios from 'axios'

// In this file:
//  1. GET: Send raw userInput (potentially erroneous) to MapBox to retrieve location's lat/lon.
//  2. Multiple GET: Use mapBox's lat/lon to get weather data (at preferred the time interval) from Foreca API.

const mapBoxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const forecaBaseUrl = 'https://fnw-us.foreca.com/api/v1/api/v1'
const weatherInfo: HashTable<object | object[]> = {}
const locationInfo = {
  lon: '',
  lat: '',
  placeName: '',
}

// 1. GET: Send raw userInput (potentially erroneous) to MapBox to retrieve location's lat/lon.
//    Performs an API call to MapBox API with userInput.
//    Sets the response as locationData
//    Returns a promise.
const getLocationDetails = (url: string) => {
  return axios.get(url).then(response => {
    // Filter out empty responses. Mapbox will still respond with 200's on some bad calls.
    if (response.data.features !== []) {
      // Set the appropriate response data to locationInfo.
      locationInfo.lon = response.data.features[0].center[0]
      locationInfo.lat = response.data.features[0].center[1]
      locationInfo.placeName = response.data.features[0].place_name
    }
  })
}

// 2. Multiple GET: Use mapBox's lat/lon to get weather data (at preferred the time interval) from Foreca API.
//    Performs an API call to Foreca by requested time interval.
//    Sets the response as a key on weatherInfo.
//    Returns a promise.
const getWeatherDetails = (
  timeFrame: string,
  axiosConfig: { headers: { Authorization: string } },
  windUnit = 'MPH',
  tempUnit = 'F'
) => {
  const { lon, lat, placeName } = locationInfo
  let keyName = ''
  return axios
    .get(
      `${forecaBaseUrl}/${timeFrame}/${lon},${lat}?tempunit=${tempUnit}&windunit=${windUnit}`,
      axiosConfig
    )
    .then(response => {
      // Prepare the keyName for proper object construction
      timeFrame.includes('forecast/')
        ? (keyName = timeFrame.slice(9, timeFrame.length))
        : null
      timeFrame.includes('forecast/15')
        ? (keyName = timeFrame.slice(11, timeFrame.length))
        : null
      // Construct the weatherInfo object
      response.data.forecast
        ? (weatherInfo[keyName] = response.data.forecast)
        : (weatherInfo[timeFrame] = response.data.current)
    })
    .catch(error =>
      console.error(`ERROR in retrieving weatherInfo for: ${placeName}`, error)
    )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [searchParams, token, windUnit, tempUnit] = req.query.location
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // MapBox config - MapBox is used to handled potential erroneous searchParams
  const urlComplete = `${mapBoxBaseUrl}/${encodeURIComponent(
    searchParams
  )}.json?limit=1&access_token=${process.env.MAPBOX_API_KEY}`

  // 1. GET: Send raw userInput (potentially erroneous) to MapBox to retrieve location's lat/lon.
  getLocationDetails(urlComplete)
    .then(() => {
      // 2. Multiple GET: Use mapBox's lat/lon to get weather data (at preferred the time interval) from Foreca API.
      Promise.all([
        getWeatherDetails('current', axiosConfig),
        getWeatherDetails('forecast/15minutely', axiosConfig),
        getWeatherDetails('forecast/hourly', axiosConfig),
        getWeatherDetails('forecast/daily', axiosConfig),
      ])
        .then(() => res.json({ locationInfo, weatherInfo })) // Send all collected information back to the frontend
        .catch(error => console.error('ERROR in Promise.all(): ', error))
    })
    .catch(error => {
      const errStr = 'ERROR in retrieving placeName from raw userInput:'
      console.error(errStr, error)
      res.status(error.status || 400).json({ message: errStr, error: error })
    })
}
