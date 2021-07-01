/** @format */
import React, { useEffect, useState } from 'react'
import { PublishButton } from 'components/Table/PublishButton'
import styles from './Menu.module.scss'
import NavBar from "components/NavBar/NavBar";
import Table from 'components/Table/Table'
import SubHeader from 'components/layout/SubHeader'
import { useData } from 'context/DataProvider'

const Menu = () => (
	<div className={styles.Menu}>
		<SubHeader title={'Menu Management'} />
		<MenuView />
		<PublishButton />
	</div>
)

export default Menu


const MenuView = () => {
	const [ activeMenu, setActiveMenu ] = useState(null)
	const { menus } = useData()

	useEffect(() => {
		if (menus) {
			setActiveMenu(menus[0])
			}
	}, [menus])

	return (
		<>
			<NavBar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
			<div className={styles.MenuContent}>
				<Table data={activeMenu} />
			</div>
		</>
	)
}