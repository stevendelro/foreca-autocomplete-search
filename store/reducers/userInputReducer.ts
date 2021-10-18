import { Action } from '../actions'
import { ActionTypes } from '../action-types'
import { LocationWeatherState } from './types'

const initialState = {
  loading: false,
  error: null,
  locationInfo: {
    lat: 0,
    lon: 0,
    placeName: '',
  },
  weatherInfo: {
    current: {
      cloudiness: 0,
      dewPoint: 0,
      feelsLikeTemp: 0,
      precipProb: 0,
      precipRate: 0,
      pressure: 0,
      relHumidity: 0,
      symbol: '',
      symbolPhrase: '',
      temperature: 0,
      thunderProb: 0,
      time: '',
      uvIndex: 0,
      visibility: 0,
      windDirString: '',
      windGust: 0,
      windSpeed: 0,
    },
    daily: [],
    hourly: [],
    minutely: [],
  },
}

const userInputReducer = (
  state: LocationWeatherState = initialState,
  action: Action
): LocationWeatherState => {
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
