/** @format */

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Handle } from 'components/Table/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'
import { Item } from 'components/Form/forms'
import Form from 'components/Form'
import './MiniItemForm.module.scss'

const defaults = { title: '', price: null, section_id: 1 }

const MiniItemForm = ({ uuid, listeners, attributes }) => {
	const { updateItem, getItemDataByID } = useData()
	const data = uuid === '' ? defaults : getItemDataByID(uuid)
	const [ itemData, setItemData ] = useState(data)
	const [ isChanged, setIsChanged ] = useState(false)
	const { insertComponent } = useModal()

	const onChange = (e) => {
		const newItemData = itemData
		newItemData[ e.target.name ] = e.target.value
		setItemData(newItemData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	if (typeof itemData === undefined) debugger
	const handleClick = (e) => {
		e.preventDefault()
		insertComponent(<Form form={<Item uuid={uuid} />} />)
	}

	const handleDataChange = (e) => {
		if (e.charCode === 13 && isChanged) {
			updateItem({ id: uuid, title: itemData.title, price: itemData.price * 100 })
			setIsChanged(false)
		}
	}

	const onLostFocus = (e) => {
		if (e.currentTarget === e.target && isChanged) {
			updateItem({ id: uuid, title: itemData.title, price: itemData.price * 100 })
			setIsChanged(false)
		}
	}

	const isBlank = uuid === ''
	return (
		<div className={`node-item ${isBlank ? 'node-new' : ''}`} onClick={isBlank ? handleClick : undefined}>
			<Handle listeners={listeners} attributes={attributes} />
			<div className='node-input node-input-item'>
				<input
					name='title'
					type='text'
					className='node-title-input'
					value={itemData.title}
					onChange={onChange}
					onKeyPress={handleDataChange}
					onBlur={onLostFocus}
					placeholder='Please type in a food item. E.g. French Fries'
					disabled={isBlank}
				/>
			</div>
			<div type='button' className='btn btn-sm'>
				<FontAwesomeIcon icon={faDollarSign} fixedWidth />
			</div>
			<div style={{ textAlign: 'right' }}>
				<input
					name='price'
					className='price-input'
					placeHolder='USD'
					type='text'
					value={itemData.price ? itemData.price / 100 : 'USD'}
					onChange={onChange}
					onKeyPress={handleDataChange}
					onBlur={onLostFocus}
				/>
			</div>
			<button type='button' className='btn btn-sm'>
				<FontAwesomeIcon icon={faDotCircle} fixedWidth />
			</button>
			<button type='button' className='btn btn-sm' onClick={handleClick}>
				<FontAwesomeIcon icon={faEdit} fixedWidth />
			</button>
			<button type='button' className='btn btn-sm'>
				<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
			</button>
		</div>
	)
}

export default MiniItemForm
