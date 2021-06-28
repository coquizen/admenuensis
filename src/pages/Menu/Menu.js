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

const filterData = (menus) => {
	for (let i = 0; i < menus.length; i++) {
		if (menus[ i ].subsections) {
			menus[ i ].subsections = menus[ i ].subsections.filter((section) => section.type === 'Category')
				.sort((a, b) => a.list_order - b.list_order)
		}
		if (menus[ i ].items) {
			menus[ i ].items = menus[ i ].items.filter((item) => item.type === 'Plate')
				.sort((a, b) => a.list_order - b.list_order)
		}
	}

	menus.sort((a, b) => a.list_order - b.list_order)

	return menus
}
const MenuView = () => {
	const [ activeMenu, setActiveMenu ] = useState(null)
	const { menus } = useData()
	let data
	if (menus) {
		data = filterData(menus)
	}

	useEffect(() => {
		if (data) {
			setActiveMenu(data[ 0 ])
		}
	}, [ data ])

	return (
		<>
			<NavBar menus={data} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
			<div className={styles.MenuContent}>
				<Table data={activeMenu} />
			</div>
		</>
	)
}