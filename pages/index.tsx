import { Dispatch, bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import { Action } from '../store/actions'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { fetchData } from '../store/action-creators'

// setup a dropdown to choose what language weather data should come back in

interface IndexProps {
  fetchData(userInput?: string, lat?: number, lon?: number): Function
}

interface GeolocationInfo {
  coords: { latitude: number; longitude: number }
  timestamp: number
}

// Get permission to use browser's geolocation API
const getPosition = async (): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } catch (error) {
    console.log(error)
  }
}

const Index = ({ fetchData }: IndexProps): JSX.Element => {
  const [userInput, setUserInput] = useState('')
  // const [renderedComponent, setRenderedComponent] = useState(null)

  // Receive coordinates from geolocation. If denied, display simple search page.
  useEffect(() => {
    getPosition()
      .then(async ({ coords }: GeolocationInfo) => {
        fetchData(undefined, coords.latitude, coords.longitude)
        // const { placeName } = await getLocationByCoords([
        //   coords.latitude,
        //   coords.longitude,
        // ])
        // Router.push('/[location]/today', `/${getShortName(placeName)}/today`)
      })
      .catch(error => {
        console.log(`error`, error)
        // denyGeo()
        // setRenderedComponent(<Search />)
      })
  }, [])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    fetchData(userInput)
    setUserInput('')
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={onSubmit}>
        <TextField
          label='Enter Location'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Container>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchData: bindActionCreators(fetchData, dispatch),
})

export default connect(null, mapDispatchToProps)(Index)
