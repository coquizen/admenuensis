/** @format */

import React from 'react'
import {DropDownMenu, Switch} from 'components/Form'
import styles from './Item.module.scss'

const Item = ({data, reset, register}) => {
	reset({
		id: data.id,
		title: data.title,
		description: data.description === undefined ? '' : data.description,
		price: data.price === undefined ? '' : data.price / 100,
		active: data.active === undefined ? true : data.active,
		visible: data.visible === undefined ? true : data.visible,
		section_id: data.section_id === undefined ? '' : data.section_id
	})

	const parentSection = register("section_id")
	const visible = register("visible", {required: true})
	const disable = register("disable", {required: true})

	return (
		<React.Fragment>
			<input {...register("id")} type='hidden'/>
			<div className={styles.ItemInputs}>
				<label htmlFor='title' className={styles.ItemLabel}>
					Name
				</label>
				<input
					{...register("title", {required: true, minLength: 1})}
					type={'text'}
					className={styles.ItemInput}
					placeholder='Please enter section name e.g. Desserts'/>
			</div>

			<div className={styles.ItemInputs}>
				<label htmlFor='description' className={styles.ItemLabel}>
					Description
				</label>
				<input
					{...register("description")}
					className={styles.ItemInput}
					id='description'
					rows='3'
					placeholder={"Enter description of the item..."}
				/>
			</div>

			<div className={styles.ItemInputs}>
				<label className={styles.ItemLabel} htmlFor='price'>
					Price
				</label>
				<input type='number'
					   className={styles.ItemInput} {...register("number", {validate: {positive: v => parseInt(v) > 0}})} />
			</div>
			<div className={styles.ItemInputs}>
				<div>Other Settings</div>
				<div className='section-switches'>
					<Switch label='Disable' name='active' inputRef={disable.ref}/>
					<Switch label='Visible' name='visible' inputRef={visible.ref}/>
				</div>
			</div>
			<div className={styles.ItemInputs}>
				<DropDownMenu name={"section_id"} inputRef={parentSection.ref} itemID={data.id}/>
			</div>
		</React.Fragment>
	)
}

export default Item
