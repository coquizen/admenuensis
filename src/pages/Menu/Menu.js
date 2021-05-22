/** @format */
import React, { useEffect, useState } from 'react'
import { PublishButton } from 'components/DragAndDrop/PublishButton'
import styles from './Menu.module.scss'
import NavBar from "components/NavBar/NavBar";
import Table from 'components/DragAndDrop/Table'
import SubHeader from 'components/layout/SubHeader'
import { fetchMenus } from 'services/data'

const Menu = () => {
	const [ menus, loadMenus ] = useState()

	useEffect(() => {
			loadMenus(fetchMenus())
	}, [])

	return (
		<div className={styles.Menu}>
			<SubHeader title={'Menu Management'} />
			{menus && <MenuView menus={menus} />}
			<PublishButton />
		</div >
	)
}
export default Menu

const MenuView = ({ menus }) => {
	const [ activeMenu, setActiveMenu ] = useState()
	menus.sort((a,b) => a.list_order - b.list_order)

	if (!activeMenu) {
		setActiveMenu(menus[0])
		console.log('I have been set inside here')
	}
	return (
		<>
			{activeMenu && <>
			<NavBar menus={menus} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
			<div className={styles.MenuContent}>
				<Table data={activeMenu} />
			</div></>}
		</>
	)
}