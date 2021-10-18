import { Dispatch, bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import { Action } from '../store/actions'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { GeolocationInfo } from '../types'
import { LocationWeatherState } from '../store/reducers/types'
import { Spinner } from '../components/Spinner'
import { StoreState } from '../store/reducers/index'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { fetchData } from '../store/action-creators'
import { getPosition } from '../util'

// setup a dropdown to choose what language weather data should come back in

interface IndexProps {
  fetchData(userInput?: string, lat?: number, lon?: number): Function
  locationWeather: LocationWeatherState
}

const Index = ({ fetchData, locationWeather }: IndexProps): JSX.Element => {
  const [userInput, setUserInput] = useState('')

  // Receive coordinates from geolocation. If denied, display simple search page.
  useEffect(() => {
    getPosition()
      .then(async ({ coords }: GeolocationInfo) => {
        fetchData(undefined, coords.latitude, coords.longitude)
      })
      .catch(error => {
        console.log(`error`, error)
        // HANDLE USER DENIAL OF GEOLOCATION
      })
  }, [])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    fetchData(userInput)
    setUserInput('')
  }

  return (
    <>
      <Spinner isLoading={locationWeather.loading} />
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
    </>
  )
}

const mapStateToProps = ({
  locationWeather,
}: StoreState): { locationWeather: LocationWeatherState } => {
  return { locationWeather }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchData: bindActionCreators(fetchData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
