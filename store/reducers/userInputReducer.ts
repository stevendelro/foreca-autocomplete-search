import { Action } from '../actions'
import { ActionType } from '../action-types'

interface RespositoresState {
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
  state: RespositoresState = initialState,
  action: Action
): RespositoresState => {
  switch (action.type) {
    case ActionType.FETCH_DATA_STARTED:
      return {
        ...state,
        loading: true,
      }
    case ActionType.FETCH_DATA:
      return {
        ...state,
        locationInfo: action.payload.locationInfo,
        weatherInfo: action.payload.weatherInfo,
      }
    case ActionType.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default userInputReducer
