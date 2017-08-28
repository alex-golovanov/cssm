import _ from 'lodash'


//immutable object manipulation with lodash
export const obj = {

	//recursevely merge with an object on path
	mergeIn: function( currentState, path, payload ) {
		let nextState = _.cloneDeep(currentState)
		let currentMergeBranch = _.get(nextState, path, {})
		let nextMergeBranch = _.merge(currentMergeBranch, payload)
		return _.set(nextState, path, nextMergeBranch)
	},

	//overwrite contents of an object on path
	setIn: function( currentState, path, payload ) {
		let nextState = _.cloneDeep(currentState)
		return _.set(nextState, path, payload)
	},

	//remove element at path
	unsetIn: function( currentState, path ){
		let nextState = _.cloneDeep(currentState)
		_.unset(nextState, path)
		return nextState
	}


} 
