/** @format */

import React from 'react'
import styles from './DropDownMenu.module.scss'

const DropDownMenu = ({ register, list, title, name }) => {
	return <div className={styles.Container}>
		<label htmlFor={name} className={styles.Label}>{title}</label>
		<select {...register(name)} className={styles.Menu}>
			{list && list.map(
				(item) => {
					return (
						<option key={item.id} value={item.id}>
							{item.title}
						</option>
					)
				})})
		</select>
	</div>
}

export default DropDownMenu
