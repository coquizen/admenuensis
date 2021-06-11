/** @format */

import React, { useState, useEffect } from 'react'
import DropDownMenu from 'components/Form'
import Switch from 'components/Form/Switch'
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


	return (
		<>
		{(sections !== null) ?
			<React.Fragment>
				<input {...register("id")} type='hidden' />
				<div className={styles.Container}>
					<label htmlFor="title" className={styles.Label}>
						Name
						</label>
					<input
						{...register("title", { required: true, minLength: 1 })}
						type="text"
						className={styles.Input}
						id="title"
						placeholder="Please enter section name e.g. Desserts" />
				</div>
				<div className={styles.Container}>
					<label htmlFor='description' className={styles.Label}>
						Description
					</label>
					<input
						type="text"
						className={styles.Input}
						rows="3"
						{...register("description")} />
				</div>
				<div className={styles.Container}>
					<DropDownMenu list={meals} register={register} label="section_id" title="Meals" />
				</div>
				<div classname={styles.container}>
				<div classname={styles.label}>other settings</div>
				<div classname={styles.switchgroup}>
					<switch title="disable" name="disable" register={register} />
					<switch title="visible" name="visible" register={register} />
				</div>
			</div>
			</React.Fragment>
			: <Spinner />}
		</>
	)
}
export default Section


