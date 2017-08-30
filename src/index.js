import 'react-virtualized/styles.css'
import 'styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from 'store'
import App from 'containers/App'

const rootElement = document.getElementById('root')
const render = (Component) => {
	ReactDOM.render(
		<CookiesProvider>
			<Provider store={store}>
				<AppContainer>
					<ConnectedRouter history={history}>
						<Component />
					</ConnectedRouter>
				</AppContainer>
			</Provider>
		</CookiesProvider>,
		rootElement
	)
}

render(App)

if (module.hot) module.hot.accept('./containers/App', () => {
	render(require('./containers/App').default)
})