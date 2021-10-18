import { LocationWeatherState } from './types'
import { combineReducers } from 'redux'
import userInputReducer from './userInputReducer'

export interface StoreState {
  locationWeather: LocationWeatherState
}

const reducers = combineReducers<StoreState>({
  locationWeather: userInputReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
