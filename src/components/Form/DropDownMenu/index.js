/** @format */

import React, { useState } from 'react'
import { useData } from 'context/DataProvider'

const DropDownMenu = ({ name, ref, itemID }) => {
	const { parentingSections } = useData()
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='dropdown'>
			<button className='btn btn-sm dropdown-toggle' type='button' onClick={toggle}>
				Select Parent Section
			</button>
			<ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} name={name}>
				{parentingSections.map(
					(parent) =>
						parent.id !== itemID && (
							<li key={parent.slug} id={parent.id}>
								<button className='dropdown-item' type='button'>
									{parent.title}
								</button>
							</li>
						)
				)}
			</ul>
		</div>
	)
}

export default DropDownMenu
