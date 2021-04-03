/** @format */

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'
import 'assets/scss/admin.scss'
import { Header } from './components/layout'
import SideBar from 'components/layout/SideBar'

import ModalProvider from 'context/ModalProvider'
import DataProvider from 'context/DataProvider'

const App = () => {
	return (
		<DataProvider>
			<ModalProvider>
				<Router>
					<div className='app-wrapper'>
						<SideBar />
						<div className='page'>
							<Header />
							<div className='page__body'>
								<Routes />
							</div>
						</div>
					</div>
				</Router>
			</ModalProvider>
		</DataProvider>
	)
}
export default App
