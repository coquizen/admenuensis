/** @format */

import React, { forwardRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useModal } from 'context/ModalProvider'
import { useData } from 'context/DataProvider'
import { DropDownMenu } from './components/DropDownMenu'
import { Switch } from './components/Switch'
const SectionForm = forwardRef(({ data }, ref) => {
	const { allSectionsData } = useData()
	const [allSections, setAllSections] = useState(allSectionsData)
	const { register, handleSubmit } = useForm()
	const { onClose } = useModal()

	const closeModal = (e) => {
		e.preventDefault()
		onClose()
	}
	useEffect(() => {
		setAllSections(allSectionsData)
	}, [allSectionsData])

	const close = (e) => {
		e.preventDefault()
		onClose()
	}

	const onSubmit = (e) => (data) => {
		alert(data)
		closeModal(e)
	}

	return (
		<form ref={ref} onSubmit={() => handleSubmit(onSubmit)}>
			<div className='modal-body'>
				<div className='form-row'>
					<label htmlFor='section-name' className='custom-form-label'>
						Name
					</label>
					<input
						name='section-name'
						ref={(register, { required: true })}
						type='text'
						className='form-input'
						id='section-name'
						placeholder='Please enter section name e.g. Desserts'
						value={data && data.title}></input>
				</div>
				<hr />
				<div className='form-row'>
					<label htmlFor='section-description' className='custom-form-label'>
						Description
					</label>
					<input
						type='text'
						name='description'
						className='form-input'
						id='section-description'
						rows='3'
						ref={register}
						value={data && data.description}></input>
				</div>
				<hr />
				<div className='form-row'>
					<div>Other Settings</div>
					<div className='section-switches'>
						<Switch label='Disable' name='isDisabled' ref={register} />
						<Switch label='Visible' name='isVisible' ref={register} />
						<Switch label='Time Restricted' name='isRestricted' ref={register} />
					</div>
				</div>
				<hr />
				<div className='form-row'>
					<label htmlFor='select-parent-section' className='custom-form-label'>
						Parent Group
					</label>
					<DropDownMenu items={allSections} />
				</div>
			</div>
			<div className='modal-footer'>
				<button type='button' className='btn btn-secondary' onClick={close}>
					Cancel
				</button>
				<button input='button' type='submit' className='btn btn-primary'>
					Save changes
				</button>
			</div>
		</form>
	)
})
export default SectionForm
