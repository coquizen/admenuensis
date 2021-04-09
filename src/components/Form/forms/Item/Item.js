/** @format */

import React, { useEffect } from 'react'
import { useData } from 'context/DataProvider'
import { Switch } from 'components/Form'
import { DropDownMenu } from 'components/Form'
const defaultValues = {
	id: '',
	title: '',
	description: '',
	parent_section_id: '',
	price: '',
	active: true,
	visible: true,
}

const Item = ({ uuid, setValue, reset, register }) => {
	const { getItemDataByID } = useData()
	const data = uuid === '' ? defaultValues : getItemDataByID(uuid)

	useEffect(() => {
		if (uuid === 'blank') {
			setValue(defaultValues)
		} else {
			// const data = allSectionsData.find(section => section.id == dataID)
			const parsedData = {
				id: data.id,
				title: data.title,
				description: data.description === undefined ? '' : data.description,
				price: data.price === undefined ? '' : data.price / 100,
				active: data.active === undefined ? true : data.active,
				visible: data.visible === undefined ? true : data.visible,
				parent_section_id: data.section_parent_id === undefined ? '' : data.section_parent_id,
			}
			reset(parsedData)
		}
	}, [reset, data, uuid, setValue])

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
						placeholder='Please enter section name e.g. Desserts' />
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
						ref={register} />
				</div>
				<hr />
				<div className='form-row'>
					<label className='visually-hidden' htmlFor='price'>
						Price
					</label>
					<div className='input-group input-price'>
						<div className='input-group-text'>$</div>
						<input type='number' className='form-control' name='price' ref={register} />
					</div>
				</div>
				<div className='form-row'>
					<div>Other Settings</div>
					<div className='section-switches'>
						<Switch label='Disable' name='active' ref={register} />
						<Switch label='Visible' name='visible' ref={register} />
					</div>
				</div>
				<div className='form-row'>
					<DropDownMenu name='section_parent_id' ref={register} itemID={uuid} />
				</div>
			</div>
		</React.Fragment>
	)
}

export default Item
