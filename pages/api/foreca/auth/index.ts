import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'universal-cookie'

const user = process.env.FORECA_USER
const password = process.env.FORECA_PASSWORD

// Figure out how to set either the browser's cookie from back here, or the Authorization header.

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
