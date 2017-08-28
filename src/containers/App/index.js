import React from 'react'
import { connect } from 'react-redux'

import css from './index.scss'

console.log(css)
console.log(1243)

class App extends React.Component {
	
	componentDidMount(){
		console.log(css, 1234)
	}

	// componentWillMount(){
	// 	console.log(this.props)
	// }

	render() {

		const { history, children } = this.props

		return (
			<div className={css.app}>
				<h1>App</h1>
				{children}
			</div>
		)
	}
}


export default connect()(App)