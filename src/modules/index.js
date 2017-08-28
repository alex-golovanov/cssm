import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import generic from 'modules/generic'

const rootReducer = combineReducers({
	routing,
	generic,
	form
})

export default rootReducer
