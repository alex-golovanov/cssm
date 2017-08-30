// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { AppBar, Layout, NavDrawer, Panel,  } from 'react-toolbox'

import routes from 'routes'
import SideNav from 'containers/SideNav'

// import css from './index.scss'

type PropTypes = {
	dispatch: Function
};

class App extends React.Component<PropTypes> {

	props: PropTypes;

	render() {

		return (
			<Layout>
				
				<NavDrawer width="wide" active={false} pinned={false} permanentAt='sm' onOverlayClick={ () => null }>
					<SideNav />
				</NavDrawer>
					
				<Panel>
					<AppBar leftIcon='menu' onLeftIconClick={ () => null } />

					<div className="container">
						<Switch>
							{routes.map(route => <Route key={route.path} {...route} />)}
						</Switch>
					</div>	
				</Panel>
			</Layout>
		)
	}
}

export default connect()(App)