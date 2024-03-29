import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'

import history from './history'
import rootReducer from '../modules'

const historyMiddleware = routerMiddleware(history)

const middleware = compose(
	autoRehydrate(),
	applyMiddleware(thunkMiddleware, historyMiddleware)
)

export default function configureStore( initialState ) {
	return createStore(rootReducer, initialState, middleware)
}