/** @format */

import React from 'react'
import Table from 'components/Table/Table'
import { PublishButton } from 'components/Table/PublishButton'
import styles from './Menu.module.scss'
const Menu = () => {
	// const { result, error, loading } = menuSectionData

	return (
		<div className={styles.Menu}>
			<div className={styles.MenuHeader}>Menu Management</div>
			<div className={styles.MenuBody}>
				<Table />
				<PublishButton />
			</div>
		</div>
	)
}

export default Menu
