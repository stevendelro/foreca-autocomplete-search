import { ActionType } from '../action-types'

interface fetchDataAction {
  type: ActionType.FETCH_DATA
  payload: any
}

interface fetchDataStartedAction {
  type: ActionType.FETCH_DATA_STARTED
}

interface fetchDataSuccessAction {
  type: ActionType.FETCH_DATA_SUCCESS
  payload: object
}

interface fetchDataErrorAction {
  type: ActionType.FETCH_DATA_ERROR
  payload: any
}

export type Action =
  | fetchDataAction
  | fetchDataStartedAction
  | fetchDataSuccessAction
  | fetchDataErrorAction
