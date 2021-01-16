/** @format */

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'assets/scss/admin.scss'
import Header from './components/layout/Header'
import Home from './components/home'
import SideBar from 'components/layout/SideBar'
import Menu from 'components/menu'
import { ModalProvider } from 'context/ModalProvider'

const App = () => {
	return (
		<ModalProvider>
			<Router>
				<div className='app-wrapper'>
					<SideBar />
					<div className='page'>
						<Header />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/menu' component={Menu} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</ModalProvider>
	)
}
export default App
