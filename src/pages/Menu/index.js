/** @format */

import React from 'react'
import Table from 'components/Table/Table'
// import { useData } from 'context/DataProvider'
const Menu = () => {
	// const { result, error, loading } = menuSectionData

	return (
		<div className='view'>
			<div className='view__header'>Overview</div>
			<div className='view__body'>
				<Table />
			</div>
		</div>
	)
}

export default Menu
