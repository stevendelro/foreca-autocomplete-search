import { Dispatch } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import { Action } from '../actions'
import { ActionTypes } from '../action-types'

export const fetchData = (userInput: string) => {
  const cookies = new Cookies()
  const token = cookies.get('weatherAccessToken')
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.FETCH_DATA_STARTED,
    })
    axios
      .get(`/api/foreca/getWeather/${encodeURIComponent(userInput)}/${token}`)
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
