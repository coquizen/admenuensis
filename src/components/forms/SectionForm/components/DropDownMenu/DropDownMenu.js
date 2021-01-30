/** @format */

import React, { useState } from 'react'

const DropDownMenu = ({ items, register }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='dropdown'>
			<button className='btn btn-sm dropdown-toggle' type='button' onClick={toggle}>
				Select Parent Section
			</button>
			<ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
				{items.map((item) => (
					<li key={item.slug} id={item.id}>
						<button className='dropdown-item' type='button'>
							{item.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default DropDownMenu
