/** @format */

import React, {useEffect, useState} from 'react'
import { PublishButton } from 'components/DragAndDrop/PublishButton'
import { useData } from 'context/DataProvider'
import styles from './Menu.module.scss'
import SubHeader from 'components/layout/SubHeader'
import NavBar from "components/NavBar/NavBar";
import Table from 'components/DragAndDrop/Table'

const Menu = () => {
	const { menus } = useData()
	const [activeMenu, setActiveMenu] = useState()

	useEffect(() => {
		if (menus) {
			setActiveMenu(menus[0])
		}
	},[menus])


	console.info(menus)
	return (
		<div className={styles.Menu}>
			<SubHeader title={'Menu Management'} />
				{menus && <NavBar menus={menus} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />}
			<div className={styles.MenuBody}>
				{activeMenu && <Table data={activeMenu}/>}
			</div>
			<PublishButton />
		</div>
	)
}

export default Menu
