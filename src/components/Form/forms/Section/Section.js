/** @format */

import React, { useEffect } from 'react'
import { useData } from 'context/DataProvider'
import { Switch } from 'components/Form'
import { DropDownMenu } from 'components/Form'
import styles from './Section.module.scss'

const defaultValues = {
	id: '',
	uuid: '',
	title: '',
	description: '',
	active: true,
	visible: true,
	section_parent_id: null,
}

const Section = ({ uuid, setValue, reset, register }) => {
	const { getSectionDataByID } = useData()

	useEffect(() => {
		if (uuid === undefined) {
			setValue(defaultValues)
		} else {
			const data = getSectionDataByID(uuid)
			const parsedData = {
				id: data.id,
				title: data.title,
				description: data.description === undefined ? '' : data.description,
				active: data.active === undefined ? true : data.active,
				visible: data.visible === undefined ? true : data.visible,
				section_parent_id: data.section_parent_id === undefined ? '' : data.section_parent_id,
			}
			reset(parsedData)
		}
	}, [getSectionDataByID, reset, setValue, uuid])

	return (
		<React.Fragment>
			<input name='id' ref={register} type='hidden'/>
			<div className={styles.container}>
				<div className={styles['form-row']}>
					<label htmlFor='title' className={styles['form-label']}>
						Name
					</label>
					<input
						name='title'
						ref={register}
						type='text'
						className={styles['form-input']}
						id='title'
						placeholder='Please enter section name e.g. Desserts'/>
				</div>
				<hr />
				<div className={styles['form-row']}>
					<label htmlFor='description' className={styles['form-label']}>
						Description
					</label>
					<input
						type='text'
						name='description'
						className={styles['form-input']}
						id='description'
						rows='3'
						ref={register}/>
				</div>
				<hr />
				<div className={styles['form-row']}>
					<div>Other Settings</div>
					<div className={styles['form-switch-group']}>
						<Switch label='Disable' name='active' ref={register} />
						<Switch label='Visible' name='visible' ref={register} />
					</div>
				</div>
				<hr />
				<div className={styles['form-row']}>
					<DropDownMenu name='section_parent_id' ref={register} itemID={uuid} />
				</div>
			</div>
		</React.Fragment>
	)
}
export default Section
