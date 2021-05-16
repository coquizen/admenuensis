/** @format */

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'
import { Header } from './components/layout'
import Providers  from 'context'
import styles from './App.module.scss'
import SideBar from 'components/layout/SideBar'

const App = () => {
	return (
		<Providers>
			<Router>
				<div className={styles.AppWrapper}>
					<SideBar />
					<div className={styles.Page}>
						<Header />
						<div className={styles.Content}>
							<Routes />
						</div>
					</div>
				</div>
			</Router>
		</Providers>
	)
}
export default App
