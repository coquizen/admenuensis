/** @format */

import React from 'react'
import Clock from 'react-live-clock'
import classnames from 'classnames'
import { useAuth } from 'context/AuthProvider'
import styles from './Header.module.scss'

const Header = () => {
	const { isAuthenticated } = useAuth()
	return (
		<div className={classnames(
			styles.Header,
			isAuthenticated() && styles.Show)}>
			<div id='clock' className='fs-3'>
				<Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Eastern'} />
			</div>
		</div>
	)
}
export default Header
