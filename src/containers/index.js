import React from 'react'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Switch, Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'



import App from './App'
import Home from './Home'

const Test = () => <div>Test</div>
const NoMatch = () => <div>404 - Not found</div>

// import Auth from './Auth'
// import Cabinet from './Cabinet'
// import NoMatch from './NoMatch'
// import Test from './Test'

// import Global from './Global'
// import Generic from './Generic'
// import GenericUser from './GenericUser'
// import GenericUsers from './GenericUsers'
// import D3 from './D3'

// import AuthLogin from './AuthLogin'
// import AuthRegistration from './AuthRegistration'
// import AuthEmailVerification from './AuthEmailVerification'
// import AuthPasswordRecovery from './AuthPasswordRecovery'
// import AuthNotification from './AuthNotification'


const AppRoutes = ( props ) => ( { match } ) => {
	return (
		<App {...props}>
			<Switch>
				<Route exact path={`/test/:param?`} component={Test} />
				<Route exact path="/" component={Home} />
			</Switch>
		</App>
	)
}

// const AuthRoutes = ( props ) => ( { match } ) => {
// 	const { path } = match
// 	return (
// 		<Auth {...props}>
// 			<Route path={`${path}/login`} component={AuthLogin} />
// 			<Route path={`${path}/register`} component={AuthRegistration} />
// 			<Route path={`${path}/verify/:code?`} component={AuthEmailVerification} />
// 			<Route path={`${path}/recover/:code?`} component={AuthPasswordRecovery} />
// 			<Route path={`${path}/notification/:section/:type?`} component={AuthNotification} />
// 		</Auth>
// 	)
// }

export default class Root extends React.Component {
	render() {
		const { store, history } = this.props
		return (
			<CookiesProvider>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<div>
							<Switch>
								<Route exact path="/" component={AppRoutes({ history })} />
								<Route component={NoMatch} />
							</Switch>	
						</div>
					</ConnectedRouter>
				</Provider>
			</CookiesProvider>
		)
	}
}