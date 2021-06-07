/** @format */
import React, {useEffect, useState} from 'react'
import {PublishButton} from 'components/Table/PublishButton'
import styles from './Menu.module.scss'
import NavBar from "components/NavBar/NavBar";
import Table from 'components/Table/Table'
import SubHeader from 'components/layout/SubHeader'
import {fetchMenus} from 'services/data'

const Menu = () => {
	const [menus, loadMenus] = useState(null)

	useEffect(() => {
		fetchMenus().then(({data}) => {
			data.sort((a, b) => a.list_order - b.list_order)
			loadMenus(data)
		})
	}, [loadMenus])

	console.info('menu.js: ', menus )
	return (
		<>
		{menus && <div className={styles.Menu}>
			<SubHeader title={'Menu Management'} />
			<MenuView menus={menus} />
			<PublishButton />
		</div>}
		</>
	)
}
export default Menu

const MenuView = ({ menus }) => {

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
	const [ activeMenu, setActiveMenu ] = useState(menus[0])
	return (
		<>
			<NavBar menus={menus} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
			<div className={styles.MenuContent}>
				<Table data={activeMenu} />
			</div>
		</>
	)
}