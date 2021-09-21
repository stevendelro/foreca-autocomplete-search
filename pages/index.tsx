import axios from 'axios'
import Cookies from 'universal-cookie'
import React, { useState } from 'react'
import Container from '@material-ui/core/Container'

// figure out how to handle userInput spaces and misspellings
// setup a dropdown to choose what language weather data should come back in

export default function Index() {
  const [userInput, setUserInput] = useState('')
  const cookies = new Cookies()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = cookies.get('weatherAccessToken')
    axios
      .get(`/api/foreca/getWeather/${encodeURIComponent(userInput)}/${token}`)
      .then(response => console.log(`response.data`, response.data))
      .catch(error => console.error('ERROR IN onSubmit', error))
    setUserInput('')
  }

  return (
    <Container maxWidth='sm'>
      <h1>index.js</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </Container>
  )
}
