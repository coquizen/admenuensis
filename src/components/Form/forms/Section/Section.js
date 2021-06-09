/** @format */

import React from 'react'
import { DropDownMenu, Switch } from 'components/Form'
import styles from '../Form.module.scss'

const Section = ({ data, reset, register }) => {
	reset({
		id: data.id,
		title: data.title,
		description: data.description === undefined ? '' : data.description,
		active: data.active === undefined ? true : data.active,
		visible: data.visible === undefined ? true : data.visible,
		section_id: data.section_id === undefined ? "" : data.section_id,
	})

	const parentSection = register("section_id")
	const disable = register("disable", { required: true })
	const visible = register("visible", { required: true })

	return (
		<React.Fragment>
			<input {...register("id")} type='hidden' />
			<div className={styles.Container}>
				<label htmlFor='title' className={styles.Label}>
					Name
					</label>
				<input
					{...register("title", { required: true, minLength: 1 })}
					type='text'
					className={styles.FormInput}
					id='title'
					placeholder='Please enter section name e.g. Desserts' />
			</div>
			<div className={styles.Container}>
				<label htmlFor='description' className={styles.Label}>
					Description
				</label>
				<input
					type='text'
					className={styles.FormInput}
					rows='3'
					{...register("description")} />
			</div>
			<h1 className={styles.Subheader}>Other Settings</h1>
			<div className={styles.SwitchGroup}>
				<Switch label='Disable' inputRef={disable.ref} />
				<Switch label='Visible' inputRef={visible.ref} />
			</div>
			<div className={styles.Container}>
				<DropDownMenu name='section_id' inputRef={parentSection.ref} itemID={data.id} />
			</div>
		</React.Fragment>
	)
}
export default Section
