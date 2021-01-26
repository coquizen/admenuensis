/** @format */

import React, { useState } from 'react'
import { useModal } from 'context/ModalProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
import { Handle } from 'components/Table/Item/components/Handle'

const MiniSectionForm = ({ data, listeners, attributes }) => {
	const { title } = data
	const [sectionTitle, setSectionTitle] = useState(title)
	const { insertComponent } = useModal()

	const onChange = (e) => {
		setSectionTitle(e.target.value)
	}

	const handleClick = (e) => {
		e.preventDefault()
		insertComponent('section', data)
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
