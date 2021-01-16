/** @format */

import React from 'react'
import TableView from 'components/menu/TableView'
import TreeView from 'components/menu/TreeView'

const Menu = () => {
	return (
		<div className='menu-canvas'>
			<TreeView />
			<TableView />
		</div>
	)
}

export default Menu
