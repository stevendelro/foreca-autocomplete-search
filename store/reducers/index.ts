import { combineReducers } from 'redux'
import userInputReducer from './userInputReducer'

const reducers = combineReducers({
  locationWeather: userInputReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
