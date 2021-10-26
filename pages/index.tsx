import { Dispatch, bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import { Action } from '../store/actions'
import Container from '@material-ui/core/Container'
// import DailyList from '../components/daily'
import { GeolocationInfo } from '../types'
import { LocationWeatherState } from '../store/reducers/types'
import { SearchBar } from '../components/SearchBar'
import { Spinner } from '../components/Spinner'
import { StoreState } from '../store/reducers/index'
import { cityNames } from '../cityNames'
import { connect } from 'react-redux'
import { fetchData } from '../store/action-creators'
import { getPosition } from '../util'

// setup a dropdown to choose what language weather data should come back in

type IndexProps = {
  fetchData: (userInput?: string, lat?: number, lon?: number) => Function
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

  return (
    <>
      <Spinner isLoading={locationWeather.loading} />
      <Container maxWidth='sm'>
        <SearchBar
          cityNames={cityNames}
          userInput={userInput}
          fetchData={fetchData}
          setUserInput={setUserInput}
        />
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
