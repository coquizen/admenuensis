/** @format */

import React, { forwardRef } from 'react'
import styles from './Switch.module.scss'

const Switch = forwardRef(({ name, label, status }, ref) => {
	return (
		<div className={styles["toggle-switch"]}>
			<input type='checkbox' value={name} className={styles} name={name} ref={ref} />
			<label className={styles.SwitchLabel} htmlFor={name} >
				{label}
			</label>
		</div>
	)
})
export default Switch
