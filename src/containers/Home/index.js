// @flow

import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'


import css from './index.scss'

type PropTypes = {
	dispatch: Function
};

const Home = function( props: PropTypes ) : React$Element<any> {
	return (
		<div className={cn(css.home, 'row')}>
			<div className="col">
				<Input type='email' label='Email address' icon='email' value={''} onChange={(e) => console.log(e)} />
			</div>
			<div className="col"><Button icon='bookmark' label='Bookmark' raised primary /></div>
			
		</div>
	)
}

export default connect()(Home)