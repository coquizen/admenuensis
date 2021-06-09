/** @format */

import React, { useState, useEffect } from 'react'
import Spinner from 'components/Spinner'
import styles from '../Form.module.scss'
import { useData } from 'context/DataProvider'
const Section = ({ data, reset, register }) => {
	const { sections } = useData()

	reset({
		id: data.id,
		title: data.title,
		description: data.description === undefined ? '' : data.description,
		active: data.active === undefined ? true : data.active,
		visible: data.visible === undefined ? true : data.visible,
		section_id: data.section_id === undefined ? "" : data.section_id,
	})

	const meals = sections.filter((section) => section.type === 'Meal')


	return (<>{(sections !== null) ?
		<React.Fragment>
			<input {...register("id")} type='hidden' />
			<div className={styles.Container}>
				<label htmlFor='title' className={styles.Label}>
					Name
					</label>
				<input
					{...register("title", { required: true, minLength: 1 })}
					type='text'
					className={styles.Input}
					id='title'
					placeholder='Please enter section name e.g. Desserts' />
			</div>
			<div className={styles.Container}>
				<label htmlFor='description' className={styles.Label}>
					Description
				</label>
				<input
					type='text'
					className={styles.Input}
					rows='3'
					{...register("description")} />
			</div>
			<div className={styles.Container}>
				<label htmlFor='section_id' className={styles.Label}>Meal</label>
				<select {...register("section_id")} className={styles.Input}>
					{meals && meals.map(
						(parent) => {
							console.log(parent.id)
							return (
								<option key={parent.id} value={parent.id}>
									{parent.title}
								</option>
							)})
						})}
				</select>
			</div>
			<br />
			<div className={styles.Label}>Other Settings</div>
				<div className={styles.SwitchGroup}>
					<div className={styles["toggle-switch"]}>
						<input type='checkbox' className={styles.Switch} {...register("visible")} />
						<label className={styles.Label} htmlFor='visible' >
							Visible
						</label>
					</div>
				<div className={styles["toggle-switch"]}>
					<input type='checkbox' className={styles.Switch} {...register("disable")} />
					<label className={styles.Label} htmlFor='disable'>
						Disable
					</label>
				</div>
		</div>
		</React.Fragment> : <Spinner />}</>
	)
}
export default Section
