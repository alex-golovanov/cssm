import React from 'react'
// import { IndexRoute, Route } from 'react-router'
import { Route, Switch } from 'react-router'

import App from '../containers/App'
import Auth from '../containers/Auth'
import Cabinet from '../containers/Cabinet'

import Instagram from '../containers/Instagram'
import InstagramUser from '../containers/InstagramUser'
import InstagramUsers from '../containers/InstagramUsers'

// import YouTube from '../containers/YouTube'

import Generic from '../containers/Generic'
import GenericUser from '../containers/GenericUser'
import GenericUsers from '../containers/GenericUsers'

import Home from '../containers/Home'
import Search from '../containers/Search'
import Test from '../containers/Test'
import TestForm from '../containers/TestForm'
import TestFilter from '../containers/TestFilter'

import NoMatch from '../containers/NoMatch'

import D3 from '../containers/D3'

import AuthLogin from '../containers/AuthLogin'
import AuthRegistration from '../containers/AuthRegistration'
import AuthEmailVerification from '../containers/AuthEmailVerification'
import AuthNotification from '../containers/AuthNotification'
import AuthPasswordRecovery from '../containers/AuthPasswordRecovery'

// <IndexRoute component={Home}/>

const AppRoutes = (
	<Route path="/" component={App}>
		
		<Route path="d3" component={D3}/>

		<Route path="youtube" component={Generic}/>
		<Route path="youtube/users(/:page)" component={GenericUsers}/>
		<Route path="youtube/user/:id" component={GenericUser}/>

		<Route path="instagram" component={Generic}/>
		<Route path="instagram/users(/:page)" component={InstagramUsers}/>
		<Route path="instagram/user/:id" component={InstagramUser}/>

		<Route path="vk" component={Generic}/>
		<Route path="vk/users(/:page)" component={GenericUsers}/>
		<Route path="vk/groups(/:page)" component={GenericUsers}/>
		<Route path="vk/user/:id" component={GenericUser}/>
		<Route path="vk/group/:id" component={GenericUser}/>

		<Route path="twitter" component={Generic}/>
		<Route path="twitter/users(/:page)" component={GenericUsers}/>
		<Route path="twitter/user/:id" component={GenericUser}/>

		<Route path="coub" component={Generic}/>
		<Route path="coub/users(/:page)" component={GenericUsers}/>
		<Route path="coub/user/:id" component={GenericUser}/>

		<Route path="periscope" component={Generic}/>
		<Route path="periscope/users(/:page)" component={GenericUsers}/>
		<Route path="periscope/user/:id" component={GenericUser}/>

		<Route path="vine" component={Generic}/>
		<Route path="vine/users(/:page)" component={GenericUsers}/>
		<Route path="vine/user/:id" component={GenericUser}/>

		<Route path="twitch" component={Generic}/>
		<Route path="twitch/users(/:page)" component={GenericUsers}/>
		<Route path="twitch/user/:id" component={GenericUser}/>

		<Route path="livejournal" component={Generic}/>
		<Route path="livejournal/users(/:page)" component={GenericUsers}/>
		<Route path="livejournal/communities(/:page)" component={GenericUsers}/>
		<Route path="livejournal/user/:id" component={GenericUser}/>
		<Route path="livejournal/community/:id" component={GenericUser}/>

		<Route path="medium" component={Generic}/>
		<Route path="medium/users(/:page)" component={GenericUsers}/>
		<Route path="medium/user/:id" component={GenericUser}/>

		<Route path="search(/:query)" component={Search}/>

		<Route path="test/form" component={TestForm}/>
		<Route path="test/filter" component={TestFilter}/>
		<Route path="test(/:param)" component={Test}/>
		
	</Route>
)

// <IndexRoute component={AuthLogin}/>

const AuthRoutes = (
	<Route path="auth" component={Auth}>
		
		<Route path="login" component={AuthLogin} />
		<Route path="register" component={AuthRegistration} />
		<Route path="verify(/:code)" component={AuthEmailVerification} />
		<Route path="notification/:section(/:type)" component={AuthNotification} />
		<Route path="recover(/:code)" component={AuthPasswordRecovery} />
	</Route>
)

const CabinetRoutes = (
	<Route path="cabinet" component={Cabinet}>
	</Route>
)

const NoMatchRoute = (<Route path="*" component={NoMatch}/>) 

export { AppRoutes, AuthRoutes, CabinetRoutes, NoMatchRoute }