/** @format */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { useAuth } from 'context/AuthProvider'
import { Home, Menu, Login, Settings, Accounts } from 'pages'

const Routes = () => (
	<Switch>
		<Route exact path='/login' component={Login} />
		<ProtectedRoutes>
			<Route exact path='/' component={Home} />
			<Route exact path='/menu' component={Menu} />
			<Route exact path='/accounts' component={Accounts} />
			<Route exact path='/settings' component={Settings} />
		</ProtectedRoutes>
	</Switch>
)

const ProtectedRoutes = ({children, ...rest}) => {
	const { isAuthenticated } = useAuth()
	return (
		<Route
			{...rest}
			render={({location}) =>
				isAuthenticated()
					? (children)
					: <Redirect to={{pathname: '/login', state: {from: location}}} />
			}
		/>
	)
}

export default Routes
