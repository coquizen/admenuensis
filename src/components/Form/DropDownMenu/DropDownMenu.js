/** @format */

import React, {forwardRef, useEffect, useState} from 'react'
import {fetchSections} from 'services/data'
import styles from './DropDownMenu.module.scss'

const DropDownMenu = forwardRef(({name, itemID, sectionID}, ref) => {
	const [sections, setSections] = useState([])
	useEffect(() => {
		fetchSections().then(({data}) => {
			const filteredSections = data.filter((section) => (section.type === 'Category') && (section.id !== itemID))
			setSections(filteredSections)
		})
	}, [])

	return (
		<div className={styles.DropDownMenu}>
			<select name={name} ref={ref}>
				{sections && sections.map(
					(parent) => {
						return (<>
							{parent.id === sectionID ? <option key={parent.id} value={parent.id} selected
															   className={styles.DropOownItem}>{parent.title}</option> :
								<option key={parent.id} value={parent.id}
										className={styles.DropOownItem}>{parent.title}</option>}</>)
					})}
			</select>
		</div>
	)
})

export default DropDownMenu
