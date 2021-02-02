/** @format */

import React from 'react'
import Table from 'components/Table/Table'
import { PublishButton } from 'components/Table/PublishButton'
// import { useData } from 'context/DataProvider'
const Menu = () => {
	// const { result, error, loading } = menuSectionData

	return (
		<div className='view'>
			<div className='view__header'>Overview</div>
			<div className='view__body'>
				<Table />
				<PublishButton />
			</div>
		</div>
	)
}

export default Menu
