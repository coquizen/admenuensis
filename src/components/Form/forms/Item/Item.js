/** @format */

import React from 'react'
import { DropDownMenu, Switch } from 'components/Form'
import styles from '../Form.module.scss'

const Item = ({ data, reset, register }) => {
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
	const visible = register("visible", { required: true })
	const disable = register("disable", { required: true })

	return (
		<React.Fragment>
			<input {...register("id")} type='hidden' />
			<div className={styles.Container}>
				<label htmlFor='title' className={styles.Label}>
					Name
				</label>
				<input
					{...register("title", { required: true, minLength: 1 })}
					type={'text'}
					className={styles.Input}
					placeholder='Please enter section name e.g. Desserts' />
			</div>
			<div className={styles.Container}>
			<label htmlFor='type' className={styles.Label}>
				Description
			</label>
			<input
				{...register("description")}
				className={styles.Input}
				id='description'
				rows='3'
				placeholder={"Enter description of the item..."}
			/>
		</div>
			<div className={styles.Container}>
				<label className={styles.Label} htmlFor='price'>
					Price
				</label>
				<input type='number'
					   className={styles.Input} {...register("number", { validate: { positive: v => parseInt(v) > 0 } })} />
			</div>
			<div className={styles.Container}>
			<DropDownMenu name={"section_id"} inputRef={parentSection.ref} itemID={data.id} />
			</div>
				<label className={styles.Label}>Other Settings</label>
			<div className={styles.SwitchGroup}>
				<Switch label='Disable' name='active' inputRef={disable.ref} status={data.disable}/>
				<Switch label='Visible' name='visible' inputRef={visible.ref} status={data.visible} />
			</div>
		</React.Fragment>
	)
}

export default Item
