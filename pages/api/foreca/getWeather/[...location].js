import axios from 'axios'
import Cookies from 'universal-cookie'

export default async (req, res) => {
  const [location, token] = req.query.location
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let locationInfo, weatherInfo
  axios
    .get(
      `https://fnw-us.foreca.com/api/v1/location/search/${location}?lang=es`,
      axiosConfig
    )
    .then(response => {
      locationInfo = response.data.locations[0]
      axios
        .get(
          `https://fnw-us.foreca.com/api/v1/forecast/daily/${locationInfo.id}`,
          axiosConfig
        )
        .then(response => {
          weatherInfo = response.data.forecast
          res.json({ locationInfo, weatherInfo })
        })
    })
    .catch(error => console.error('ERROR in receiving auth token: ', error))
}
