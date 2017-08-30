// @flow

import React from 'react'
import { connect } from 'react-redux'
import { NavDrawer, List, ListItem, ListCheckbox, ListDivider, ListSubHeader  } from 'react-toolbox'


type PropTypes = {
	dispatch: Function
};

class SideNav extends React.Component<PropTypes> {

	props: PropTypes;

	render() {

		return (
			<List selectable ripple>
				<ListSubHeader caption="List header" />
				<hr style={{height: 1, margin: 0}}/>
				<ListItem caption="List item" rightIcon="star"/>
				<ListItem caption="List item" rightIcon="fingerprint"/>
				
				<hr style={{height: 1, margin: '0 0 10px 0'}}/>

				<ListSubHeader caption="List header" />
				<hr style={{height: 1, margin: 0}}/>
				<ListItem caption="List item" rightIcon="turned_in"/>
				<ListItem caption="List item" rightIcon="turned_in_not"/>
				<ListDivider />
			</List> 
		)
	}
}

export default connect()(SideNav)