/** @format */

import React, { useEffect } from 'react'
import { useData } from 'context/DataProvider'
import { Switch } from 'components/Form'
import { DropDownMenu } from 'components/Form'


const defaultValues = {
	id: '',
	title: '',
	description: '',
	active: true,
	visible: true,

}

const Section = ({ dataID = 0, setValue, reset, register }) => {
	const { allSectionsData } = useData()
	const data = dataID == 0 ? defaultValues : allSectionsData.find((section) => dataID == section.id)

	useEffect(() => {
		if (dataID === 0) {
			setValue(defaultValues)
		} else {
			const parsedData = {
				id: dataID,
				title: data.title,
				description: data.description === undefined ? '' : data.description,
				active: data.active === undefined ? true : data.active,
				visible: data.visible === undefined ? true : data.visible,
				section_parent_id: data.section_parent_id === undefined ? null : data.section_parent_id,
			}
			reset(parsedData)
		}
	}, [defaultValues, reset])


	return (
		<React.Fragment>
			<input name='id' ref={register} type='hidden'></input>
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
						placeholder='Please enter section name e.g. Desserts'></input>
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
						ref={register}></input>
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
					<DropDownMenu itemID={data.id} />
				</div>
			</div>
		</React.Fragment>
	)
}
export default Section
