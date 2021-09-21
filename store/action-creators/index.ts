import axios from 'axios'
import Cookies from 'universal-cookie'
import { Dispatch } from 'react'
import { ActionType } from '../action-types'
import { Action } from '../actions'

export const fetchData = (userInput: string) => {
  const cookies = new Cookies()
  const token = cookies.get('weatherAccessToken')

  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_DATA_STARTED,
    })
    axios
      .get(`/api/foreca/getWeather/${encodeURIComponent(userInput)}/${token}`)
      .then(({ data }) => {
        dispatch({
          type: ActionType.FETCH_DATA_SUCCESS,
          payload: data,
        })
        console.log(`response.data`, data)
      })
      .catch(error => {
        dispatch({
          type: ActionType.FETCH_DATA_ERROR,
          payload: error,
        })
        console.error('ERROR IN fetchData: ', error)
      })
  }
}
