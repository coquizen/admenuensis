/** @format */

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import Handle from 'components/DragAndDrop/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'
import Form from 'components/Form'
import { Section } from 'components/Form/forms'
import classnames from 'classnames'
import styles from './MiniSectionForm.module.scss'

const defaults = { title: '', price: null, section_id: 1 }
const MiniSectionForm = ({ uuid, listeners, attributes, isBlank = false }) => {

	const { updateSection, getSectionDataByID } = useData()
	let data
	switch (isBlank) {
		case true:
			data = defaults
			break;
		case false:
			data = getSectionDataByID(uuid)
			break;
		default:
			console.error("we shouldn't be here. How did you get here?!")
	}

	const [ sectionData, setSectionData] = useState()

	const [ sectionTitle, setSectionTitle ] = useState(data.title)
	const [ isChanged, setIsChanged ] = useState(false)

	useEffect(() => {
		if (data) {
			setSectionData(data)
		}
	}, [data])
	const { insertComponent } = useModal()

	const onChange = (e) => {
		setSectionTitle(e.target.value)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	const handleClick = (e) => {
		e.preventDefault()
		const section = isBlank ? <Section uuid='' /> : <Section uuid={uuid} />
		insertComponent(<Form form={section} />)
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
		<>
		{sectionData && <div className={styles.NodeWrapper}>
			<div className={styles.Node}>
				{!isBlank && <Handle listeners={listeners} attributes={attributes} />}
				<input
					placeholder='Type section name, e.g. Dinner or Appetizer'
					type='text'
					className={classnames(styles.NodeInput, isBlank && styles.NodeNew)}
					value={sectionTitle}
					onChange={onChange}
					onKeyPress={handleTitleChange}
					onBlur={onLostFocus}
					disabled={isBlank}
				/>
				<div className={styles.ButtonGroup}>
					<button disabled={isBlank} type='button' className='btn btn-sm'>
						<FontAwesomeIcon icon={faDotCircle} fixedWidth />
					</button>
					<button type='button' className='btn btn-sm' onClick={handleClick}>
						<FontAwesomeIcon icon={faEdit} fixedWidth />
					</button>
					<button disabled={isBlank} type='button' className='btn btn-sm'>
						<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
					</button>
					{isBlank &&
						<button type='button' className='btn btn-sm' onClick={handleClick}>
							<FontAwesomeIcon icon={faPlus} fixedWidth />
						</button>
					}
				</div>
			</div>
		</div>}</>
	)
}

export default MiniSectionForm
