// @flow

import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import css from './index.scss'

type PropTypes = {
	dispatch: Function
};

class Home extends React.Component<PropTypes> {

	props: PropTypes;

	render() : React.Element<any> {
		return (
			<div className={cn(css.home, 'row')}>
				<div className="col">
					Home page
				</div>
			</div>
		)
	}
	
}

export default connect()(Home)