import axios from 'axios'
import Cookies from 'universal-cookie'

const user = process.env.FORECA_USER
const password = process.env.FORECA_PASSWORD

// Figure out how to set either the browser's cookie from back here, or the Authorization header.
// change all the /api files to .ts

export default async (req, res) => {
  axios
    .post('https://fnw-us.foreca.com/authorize/token?expire_hours=3', {
      user,
      password,
    })
    .then(response => {
      res.json({ accessToken: response.data.access_token })
    })
    .catch(error => console.error('ERROR in receiving auth token: ', error))
}
