/** @format */

import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDotCircle, faEdit, faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import Handle from 'components/Table/Handle'
import {useData} from 'context/DataProvider'
import {useModal} from 'context/ModalProvider'
import Form from 'components/Form'
import {Section} from 'components/Form/forms'
import classnames from 'classnames'
import styles from './MiniSectionForm.module.scss'

const MiniSectionForm = ({uuid, listeners, attributes}) => {
	const {getSectionDataByID,updateSection} = useData()
	const [sectionData, setSectionData] = useState(getSectionDataByID(uuid))
	const [isChanged, setIsChanged] = useState(false)
	const {insertComponent} = useModal()

	const onChange = (event) => {
		const newSectionData = sectionData
		newSectionData[event.target.name] = event.target.value
		setSectionData(newSectionData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	const handleClick = (event) => {
		event.preventDefault()
		insertComponent(<Form label={'Section: ' + sectionData.title} form={<Section data={sectionData} />} />)
	}

	const handleDataChange = (event) => {
		if (event.charCode === 13 && isChanged) {
			updateSection({...sectionData})
			setIsChanged(false)
		}
	}

	const onLostFocus = (event) => {
		if (event.currentTarget === event.target && isChanged) {
			updateSection({id: uuid, title: sectionData.title})
			setIsChanged(false)
		}
	}

	return (
		<>
			{sectionData !== null
				? <div className={styles.NodeWrapper}>
				<div className={styles.Node}>
					<Handle listeners={listeners} attributes={attributes}/>
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
							<FontAwesomeIcon icon={faDotCircle} fixedWidth/>
						</button>
						<button type='button' className='btn btn-sm' onClick={handleClick}>
							<FontAwesomeIcon icon={faEdit} fixedWidth/>
						</button>
						<button type='button' className='btn btn-sm'>
							<FontAwesomeIcon icon={faEllipsisH} fixedWidth/>
						</button>
					</div>
				</div>
			</div>
				: <div className={classnames(styles.Gradient, styles.NodeWrapper)}>
					<input
						type='text'
						className={classnames(styles.NodeInput)}
						disabled={true}
					/>
					<div className={classnames(styles.Node, styles.Gradient)} />
				</div>
			}
		</>
	)
}
export default MiniSectionForm
