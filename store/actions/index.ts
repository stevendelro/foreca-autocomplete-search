import { ActionTypes } from '../action-types'

interface fetchData {
  type: ActionTypes.FETCH_DATA
  payload: any
}

interface fetchDataStarted {
  type: ActionTypes.FETCH_DATA_STARTED
}

interface fetchDataSuccess {
  type: ActionTypes.FETCH_DATA_SUCCESS
}

interface fetchDataError {
  type: ActionTypes.FETCH_DATA_ERROR
  payload: any
}

export type Action =
  | fetchData
  | fetchDataStarted
  | fetchDataSuccess
  | fetchDataError
