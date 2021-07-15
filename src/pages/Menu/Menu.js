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
	const [ isDirty, setDirty ] = useState(false)
	const { menus } = useData()

	useEffect(() => {
		if (menus) {
			setActiveMenu(menus[0])
			}
	}, [menus])

	const addSection = (data) => {
		setActiveMenu((activeMenu) => {
			data.list_order = activeMenu.subsections.length
			activeMenu.push(data)
			return activeMenu
		})
	}

	const addItem = (data) => {
		setActiveMenu((activeMenu) => {
			const section = activeMenu.find((section) => section.id === data.section_id)
			const sectionIndex = activeMenu.subsections.indexOf(section)
			data.list_order = activeMenu.subsections[sectionIndex].items.length
			activeMenu.subsections[sectionIndex].items.push(data)
		})
	}
	return (
		<>
			<NavBar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
			<div className={styles.MenuContent}>
				<Table data={activeMenu} addItem={addItem} addSection={addSection} isDirty={isDirty} setDirty={setDirty} />
			</div>
		</>
	)
}