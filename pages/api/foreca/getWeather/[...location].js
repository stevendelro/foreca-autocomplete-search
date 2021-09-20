import axios from 'axios'
import Cookies from 'universal-cookie'

// In this file, two consecutive API calls are made:
//  1. GET: Send raw userInput (potentially erroneous) to MapBox to retrieve location's lat/lon.
//  2. GET: Use mapBox's lat/lon to get daily (one week) weather data from Foreca API.

let locationInfo
const mapBoxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const forecaBaseUrl = 'https://fnw-us.foreca.com/api/v1'

export default async (req, res) => {
  const [userInput, token] = req.query.location
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // MapBox config - MapBox is used to handled potential erroneous userInput
  const urlComplete = `${mapBoxBaseUrl}/${encodeURIComponent(
    userInput
  )}.json?limit=1&access_token=${process.env.MAPBOX_API_KEY}`

  // 1. GET: Send raw userInput (potentially erroneous) to MapBox to retrieve location's lat/lon.
  axios
    .get(urlComplete)
    .then(response => {
      // Filter out empty responses. Mapbox will still respond with 200's on some bad calls.
      if (response.data.features !== []) {
        // Receive appropriate placeName from raw userInput.
        locationInfo = {
          lon: response.data.features[0].center[0],
          lat: response.data.features[0].center[1],
          placeName: response.data.features[0].place_name,
        }
      }
    })
    .then(() => {
      // 2. GET: Use mapBox's lat/lon to get daily (one week) weather data from Foreca API.
      const { lon, lat, placeName } = locationInfo
      axios
        .get(`${forecaBaseUrl}/forecast/daily/${lon},${lat}`, axiosConfig)
        .then(response => {
          const weatherInfo = response.data.forecast
          // RESPOND: Send back information to the front
          res.json({ locationInfo, weatherInfo })
        })
        .catch(error =>
          console.error(
            `ERROR in retrieving weatherInfo for: ${placeName}`,
            error
          )
        )
    })
    .catch(error => {
      const errStr = 'ERROR in retrieving placeName from raw userInput:'
      console.error(errStr, error)
      res.status(error.status || 400).json({ message: errStr, error: error })
    })
}
