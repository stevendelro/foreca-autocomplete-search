import { Action } from '../actions'
import { ActionTypes } from '../action-types'
import Cookies from 'universal-cookie'
import { Dispatch } from 'redux'
import axios from 'axios'

export const fetchData = (
  userInput?: string,
  lat?: number,
  lon?: number
): Function => {
  const cookies = new Cookies()
  const token = cookies.get('weatherAccessToken')

  const searchParams = userInput
    ? encodeURIComponent(userInput)
    : `${lon},${lat}`

  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionTypes.FETCH_DATA_STARTED,
    })
    axios
      .get<object>(`/api/foreca/getWeather/${searchParams}/${token}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.FETCH_DATA_SUCCESS,
        })
        dispatch({
          type: ActionTypes.FETCH_DATA,
          payload: data,
        })
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_DATA_ERROR,
          payload: error,
        })
        console.error('ERROR IN fetchData: ', error)
      })
  }
}
