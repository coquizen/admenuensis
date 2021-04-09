/** @format */

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
import { Handle } from 'components/Table/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'
import Form from 'components/Form'
import { Section } from 'components/Form/forms'
import './MiniSectionForm.module.scss'

const defaults = { title: '', price: null, section_id: 1 }
const MiniSectionForm = ({ uuid, listeners, attributes }) => {
	const { updateSection, getSectionDataByID } = useData()
	const data = uuid === '' ? defaults : getSectionDataByID(uuid)
	const { title, section_parent_id } = data
	const [isSubsection, setIsSubsection] = useState(section_parent_id)
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
		insertComponent(<Form form={<Section uuid={uuid} />} />)
	}

	const handleTitleChange = (e) => {
		if (e.charCode === 13 && isChanged) {
			updateSection({ id: uuid, title: sectionTitle })
			setIsChanged(false)
		}
	}

	const onLostFocus = (e) => {
		if (e.currentTarget === e.target && isChanged) {
			updateSection({ id: uuid, title: sectionTitle })
			setIsChanged(false)
		}
	}

	return (
		<div className='node-section'>
			<Handle listeners={listeners} attributes={attributes} />
			<div className='node-input'>
				<input
					placeholder='Type section name, e.g. Dinner or Appetizer'
					type='text'
					className='node-title-input'
					value={sectionTitle}
					onChange={onChange}
					onKeyPress={handleTitleChange}
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

export default MiniSectionForm
