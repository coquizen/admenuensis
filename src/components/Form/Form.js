/** @format */
import React from 'react'

import { useForm } from 'react-hook-form'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'

const Form = ({ form }) => {
	const { closeModal } = useModal()
	const { updateSection } = useData()
	const { register, handleSubmit, reset, setValue } = useForm({ shouldUnregister: false })

	const onSubmit = (data) => {
		updateSection(data)
		closeModal()
	}

	const onCloseModal = (event) => {
		event.preventDefault()
		closeModal()
	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='modal-dialog'>
					<div className='container'>
						<div className='modal-header'>
							<h5 className='custom-modal-title'>Form</h5>
							<button
								aria-label='Close Modal'
								type='button'
								className='btn btn-secondary'
								onClick={onCloseModal}></button>
						</div>
						{React.cloneElement(form, { setValue: setValue, reset: reset, register: register })}
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' onClick={closeModal}>
								Cancel
							</button>
							<button input='button' type='submit' className='btn btn-primary'>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</form>
		</React.Fragment>
	)
}

export default Form
