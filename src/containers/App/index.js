// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import routes from 'routes'

import css from './index.scss'

class App extends React.Component<Object> {

	render() {

		return (
			<div className={css.app}>
				<Switch>
					{routes.map(route => <Route key={route.path} {...route} />)}
				</Switch>
			</div>
		)
	}
}

export default connect()(App)