/** @format */

import React, { useState } from 'react'
import { useModal } from 'context/ModalProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
import { SortableHandle } from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => <div>::</div>)

const SectionItem = ({ data }) => {
	const { id, slug, title, section_parent_id } = data

	const [metaData, setMetaData] = useState(title)
	const { insertComponent } = useModal()

	const onChange = (e) => {
		setMetaData(e.target.value)
	}

	const handleClick = (e) => {
		e.preventDefault()
		insertComponent('section')
	}

	const child = section_parent_id !== undefined

	return (
		<div className={'node' + (child ? ' child' : ' branch')}>
			<button type='button' className={'btn btn-sm'}>
				<DragHandle />
			</button>
			<button type='button' className='btn btn-sm ms-auto disabled'>
				<FontAwesomeIcon icon={faImage} fixedWidth />
			</button>
			<input
				placeholder='Type section name, e.g. Dinner or Appetizer'
				className='node-input'
				type='text'
				value={metaData}
				onChange={onChange}
			/>
			<div className='btn-group btn-group-sm ms-auto' role='group'>
				<button type='button' className='btn'>
					<FontAwesomeIcon icon={faDotCircle} fixedWidth />
				</button>
				<button type='button' className='btn' onClick={handleClick}>
					<FontAwesomeIcon icon={faEdit} fixedWidth />
				</button>
				<button type='button' className='btn'>
					<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
				</button>
			</div>
		</div>
	)
}

export default SectionItem
