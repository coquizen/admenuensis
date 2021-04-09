/** @format */

import React from 'react'
import Clock from 'react-live-clock'
import styles from './Header.module.scss'

const Header = () => {
	return (
		<div className={styles.Header}>
			<div id='clock' className='fs-3'>
				<Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Eastern'} />
			</div>
		</div>
	)
}
export default Header
