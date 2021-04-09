/** @format */

import React, { useEffect } from 'react'
import { useData } from 'context/DataProvider'
import { Switch } from 'components/Form'
import { DropDownMenu } from 'components/Form'

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
	const data = uuid === 'blank' ? defaultValues : getSectionDataByID(uuid)

	useEffect(() => {
		if (uuid === undefined) {
			setValue(defaultValues)
		} else {
			// const data = allSectionsData.find(section => section.id == dataID)
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
	}, [defaultValues, reset, data])

	return (
		<React.Fragment>
			<input name='id' ref={register} type='hidden'/>
			<div className='custom-modal-body'>
				<div className='form-row'>
					<label htmlFor='title' className='custom-form-label'>
						Name
					</label>
					<input
						name='title'
						ref={register}
						type='text'
						className='form-input'
						id='title'
						placeholder='Please enter section name e.g. Desserts'/>
				</div>
				<hr />
				<div className='form-row'>
					<label htmlFor='description' className='custom-form-label'>
						Description
					</label>
					<input
						type='text'
						name='description'
						className='form-input'
						id='description'
						rows='3'
						ref={register}/>
				</div>
				<hr />
				<div className='form-row'>
					<div>Other Settings</div>
					<div className='section-switches'>
						<Switch label='Disable' name='active' ref={register} />
						<Switch label='Visible' name='visible' ref={register} />
					</div>
				</div>
				<hr />
				<div className='form-row'>
					<DropDownMenu name='section_parent_id' ref={register} itemID={uuid} />
				</div>
			</div>
		</React.Fragment>
	)
}
export default Section
