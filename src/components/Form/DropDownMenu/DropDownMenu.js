/** @format */

import React, { useState, forwardRef } from 'react'
import { useData } from 'context/DataProvider'

const DropDownMenu = forwardRef(({ name, itemID }, ref) => {
	const { allSectionsData } = useData()

	return (
		<div className='dropdown'>
			<select className='form-select' name={name} ref={ref}>
				<option className='dropdown-item' value='null'>{`<< No parent section selected >>`}</option>
				{allSectionsData.map(
					(parent) =>
						parent.id !== itemID && (
							<option key={`${parent.id}`} value={parent.id} className='dropdown-item'>
								{parent.title}
							</option>
						)
				)}
			</select>
		</div>
	)
})

export default DropDownMenu
