// @flow

import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import Input from 'components/Form/Input'

import css from './index.scss'

type PropTypes = {
	dispatch: Function
};

class Home extends React.Component<PropTypes> {

	props: PropTypes;

	render(){
		return (
			<div className={cn(css.home, 'row')}>
				<div className="col">
					Home page
					<Input type="text" label="name" name="name" />
				</div>
			</div>
		)
	}
	
}

export default connect()(Home)