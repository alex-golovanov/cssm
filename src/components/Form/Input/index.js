// @flow

import React from 'react'
import { Input } from 'react-toolbox/lib/input'
import { Field } from 'redux-form'
// import cn from 'classnames'

type PropTypes = {
	type: string
};

export default function FormInput( props: PropTypes ) {
	return <Field {...props} component={Input} />
}