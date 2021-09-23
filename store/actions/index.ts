import { ActionType } from '../action-types'

interface fetchData {
  type: ActionType.FETCH_DATA
  payload: any
}

interface fetchDataStarted {
  type: ActionType.FETCH_DATA_STARTED
}

interface fetchDataSuccess {
  type: ActionType.FETCH_DATA_SUCCESS
  payload: object
}

interface fetchDataError {
  type: ActionType.FETCH_DATA_ERROR
  payload: any
}

export type Action =
  | fetchData
  | fetchDataStarted
  | fetchDataSuccess
  | fetchDataError
