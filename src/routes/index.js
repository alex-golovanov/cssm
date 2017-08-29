import Home from 'containers/Home'

export default [{
	path: '/',
	exact: true,
	component: Home
}, {
	path: '/about',
	exact: true,
	component: () => <div>About!</div>
}]