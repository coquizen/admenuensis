/** @format */

import React, { memo, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faEdit, faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons'
import Handle from 'components/Table/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'
import Form from 'components/Form'
import { Section, Item } from 'components/Form/forms'
import classnames from 'classnames'
import styles from './MiniSectionForm.module.scss'

const MiniSectionForm = memo(({ uuid, containerID, listeners, attributes }) => {
	const { getSectionDataByID, updateSection } = useData()
	const [ sectionData, setSectionData ] = useState(getSectionDataByID(uuid))
	const [ isChanged, setIsChanged ] = useState(false)
	const { insertComponent } = useModal()

	const onChange = (event) => {
		const newSectionData = sectionData
		newSectionData[ event.target.name ] = event.target.value
		setSectionData(newSectionData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}
	const handleEditClick = (event) => {
		event.preventDefault()
		insertComponent(<Form label={'Section: ' + sectionData.title} form={<Section data={sectionData} />} />)
	}

	const handleAddItemClick = (event) => {
		event.preventDefault()
		insertComponent(<Form label={'Adding item to ' + sectionData.title} form={<Item data={{ id: 'draft', type: "Plate", section_id: uuid }} />} />)
	}

	const handleDataChange = (event) => {
		if (event.charCode === 13 && isChanged) {
			updateSection({ ...sectionData })
			setIsChanged(false)
		}
	}

	const onLostFocus = (event) => {
		if (event.currentTarget === event.target && isChanged) {
			updateSection({ id: uuid, title: sectionData.title })
			setIsChanged(false)
		}
	}

	return (
		<>
			{sectionData !== null
				? <div className={styles.NodeWrapper}>
					<div className={styles.Node}>
						<Handle listeners={listeners} attributes={attributes} />
						<input
							placeholder='Type section name, e.g. Dinner or Appetizer'
							type='text'
							className={classnames(styles.NodeInput)}
							value={sectionData.title}
							onChange={onChange}
							onKeyPress={handleDataChange}
							onBlur={onLostFocus}

						/>
						<div className={styles.ButtonGroup}>
							<button type='button' className='btn btn-sm'>
								<FontAwesomeIcon icon={faDotCircle} fixedWidth />
							</button>
							<button type='button' className='btn btn-sm' onClick={handleEditClick}>
								<FontAwesomeIcon icon={faEdit} fixedWidth />
							</button>
							<button type='button' className='btn btn-sm'>
								<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
							</button>
						</div>
						<div className={styles.ButtonGroup}>
							<button type='button' className={styles.Margin} onClick={handleAddItemClick}>
								<FontAwesomeIcon icon={faPlus} fixedWidth />
							</button>
						</div>
					</div>
				</div>
				: <div className={styles.NodeWrapper}>
					<div className={styles.Node}>
						<Handle listeners={listeners} attributes={attributes} />
						<input
							placeholder='Type section name, e.g. Dinner or Appetizer'
							type='text'
							className={classnames(styles.NodeInput)}
							value={""}
							onChange={onChange}
							onKeyPress={handleDataChange}
							onBlur={onLostFocus}

						/>
						<div className={styles.ButtonGroup}>
							<button type='button' className='btn btn-sm'>
								<FontAwesomeIcon icon={faDotCircle} fixedWidth />
							</button>
							<button type='button' className='btn btn-sm' onClick={handleEditClick}>
								<FontAwesomeIcon icon={faEdit} fixedWidth />
							</button>
							<button type='button' className='btn btn-sm'>
								<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
							</button>
						</div>
						<div className={styles.ButtonGroup}>
							<button type='button' className='btn btn-sm' onClick={handleAddItemClick}>
								<FontAwesomeIcon icon={faPlus} fixedWidth />
							</button>
						</div>
					</div>
				</div>
			}
		</>
	)
})

export default MiniSectionForm
