import 'styles/index.scss'
import 'react-virtualized/styles.css'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

import { store, history } from 'store'
import Root from 'containers'

const rootElement = document.getElementById('root')
const render = Component =>
	ReactDOM.render(
		<AppContainer>
			{Component}
		</AppContainer>,
		rootElement
	)

render(<Root store={store} history={history}/>)
if ( module.hot ) module.hot.accept( './containers/index', () => render(<Root store={store} history={history}/>) )
