/** @format */

import React from 'react'
import styles from './Switch.module.scss'

const Switch = ({ register, title, name }) => {
	return <div className={styles[ "toggle-switch" ]}>
		<input type='checkbox' className={styles.Switch} {...register(name)} />
		<label className={styles.Label} htmlFor={name}>
			{title}
		</label>
	</div>
}
export default Switch
