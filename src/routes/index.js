/** @format */
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, Menu } from 'pages'
const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/menu' component={Menu} />
		</Switch>
	)
}

export default Routes
