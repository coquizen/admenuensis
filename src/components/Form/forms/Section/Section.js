/** @format */

import React from 'react'
import {DropDownMenu, Switch} from 'components/Form'
import styles from './Section.module.scss'

const Section = ({data, reset, register}) => {
	reset({
		id: data.id,
		title: data.title,
		description: data.description === undefined ? '' : data.description,
		active: data.active === undefined ? true : data.active,
		visible: data.visible === undefined ? true : data.visible,
		section_id: data.section_id === undefined ? "" : data.section_id,
	})

	const parentSection = register("section_id")
	const disable = register("disable", {required: true})
	const visible = register("visible", {required: true})

	return (
		<React.Fragment>
			<input {...register("id")} type='hidden'/>
			<div className={styles.FormInputs}>
				<div className={styles.FormLabel}>
					<label htmlFor='title' className={"col-form-label"}>
						Name
					</label>
					<input
						{...register("title", {required: true, minLength: 1})}
						type='text'
						className={styles.FormInput}
						id='title'
						placeholder='Please enter section name e.g. Desserts'/>
				</div>
				<hr/>
				<div className={styles.FormLabel}>
					<label htmlFor='description' className={styles['form-label']}>
						Description
					</label>
					<input
						type='text'
						className={styles.FormInput}
						rows='3'
						{...register("description")} />
				</div>
				<hr/>
				<div className={styles.FormLabel}>
					<div>Other Settings</div>
					<div className={styles['form-switch-group']}>
						<Switch label='Disable' name='active' inputRef={disable.ref}/>
						<Switch label='Visible' name='visible' inputRef={visible.ref}/>
					</div>
				</div>
				<hr/>
				<div className={styles.FormInput}>
					<DropDownMenu name='section_id' inputRef={parentSection.ref} itemID={data.id}/>
				</div>
			</div>
		</React.Fragment>
	)
}
export default Section
