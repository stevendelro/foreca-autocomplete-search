import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const middlewares = [thunkMiddleware] // Add any future middleware to this array.

const bindMiddleware = (middlewares: any[]) => {
  return process.env.NODE_ENV !== 'production'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares)
}

const initializeStore = () =>
  createStore(rootReducer, {}, bindMiddleware(middlewares))

export const wrapper = createWrapper(initializeStore)
