import { Action } from '../actions'
import { ActionTypes } from '../action-types'

interface fetchedDataState {
  loading: boolean
  error: object | null
  locationInfo: object
  weatherInfo: object
}

const initialState = {
  loading: false,
  error: null,
  locationInfo: {},
  weatherInfo: {},
}

const userInputReducer = (
  state: fetchedDataState = initialState,
  action: Action
): fetchedDataState => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_STARTED:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.FETCH_DATA:
      return {
        ...state,
        locationInfo: action.payload.locationInfo,
        weatherInfo: action.payload.weatherInfo,
      }
    case ActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default userInputReducer
