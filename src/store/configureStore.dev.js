import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { autoRehydrate } from 'redux-persist'

import { routerMiddleware } from 'react-router-redux'

import history from './history'
import rootReducer from 'modules/index'

const loggerMiddleware = createLogger({level: {prevState: 'info', action: 'info', nextState: 'info', error: 'info'}})
const userLogger = true

const historyMiddleware = routerMiddleware(history)

const middleware = compose(
	autoRehydrate(),
	userLogger ?
		applyMiddleware(thunkMiddleware, historyMiddleware, loggerMiddleware)
			: applyMiddleware(thunkMiddleware, historyMiddleware)
)

const configureStore = function( initialState ) {

	const store = createStore(rootReducer, initialState, middleware)

	// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
	if ( module.hot ) {
		module.hot.accept('../modules', () =>
			store.replaceReducer(require('../modules')/*.default if you use Babel 6+ */)
		)
	}

	return store
}

export default configureStore
