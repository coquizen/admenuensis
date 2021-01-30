/** @format */

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
import { Handle } from 'components/Table/Item/components/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'
import { SectionForm } from 'components/forms'

const MiniSectionForm = ({ data, listeners, attributes, value }) => {
	const { updateSectionByID } = useData()
	const { id, title } = data
	const [sectionTitle, setSectionTitle] = useState(title)
	const [isChanged, setIsChanged] = useState(false)
	const { insertComponent } = useModal()

	const onChange = (e) => {
		setSectionTitle(e.target.value)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	const handleClick = (e) => {
		e.preventDefault()
		insertComponent(<SectionForm data={data} />)
	}

	const handleTitleChange = (e) => {
		if (e.charCode === 13 && isChanged) {
			const response = updateSectionByID(id, { id: id, title: sectionTitle })
			setIsChanged(false)
		}
	}

	const onLostFocus = (e) => {
		if (e.currentTarget === e.target && isChanged) {
			updateSectionByID(id, { id: id, title: sectionTitle })
			setIsChanged(false)
		}
	}

	return (
		<div className='node'>
			<Handle listeners={listeners} attributes={attributes} />
			<button type='button' className='btn btn-sm ms-auto disabled'>
				<FontAwesomeIcon icon={faImage} fixedWidth />
			</button>
			<input
				placeholder='Type section name, e.g. Dinner or Appetizer'
				className='node-input'
				type='text'
				value={sectionTitle}
				onChange={onChange}
				onKeyPress={handleTitleChange}
				onBlur={onLostFocus}
			/>

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

export default MiniSectionForm
