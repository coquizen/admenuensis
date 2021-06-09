/** @format */

import React, { forwardRef, useEffect, useState } from 'react'
import { fetchSections } from 'services/data'
import styles from './DropDownMenu.module.scss'

const DropDownMenu = forwardRef(({ name, itemID, sectionID }, ref) => {
	const [ sections, setSections ] = useState([])

	useEffect(() => {
		fetchSections().then(({ data }) => {
			const filteredSections = data.filter((section) => (section.type === 'Category') && (section.id !== itemID))
			setSections(filteredSections)
		})
	}, [])

	return (
			<div>
				<label htmlFor={name} className={styles.Label}>Section</label>
				<select id={name} ref={ref} className={styles.DropDownMenu}>
				{sections && sections.map(
					(parent) => (<>
						{parent.id === sectionID ? <option key={parent.id} value={parent.id} selected
							>{parent.title}</option> :
							<option key={parent.id} value={parent.id}
								>{parent.title}</option>}</>)
				)}
			</select>
			</div>
	)
})

export default DropDownMenu
