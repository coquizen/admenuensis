/** @format */

import React from 'react'
import styles from './Switch.module.scss'

const Switch = ({ register, title, name }) => {
	return <div className={styles.OnOffSwitch}>
		<input id={name} name={name} type="checkbox" className={styles.Checkbox} {...register(name)} />
		<label className={styles.Label} htmlFor={name}>
			<span className={styles.Inner} />
			<span className={styles.Switch}/>
		</label>
	</div>
}
export default Switch
