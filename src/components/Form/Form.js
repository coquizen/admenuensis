/** @format */
import React from 'react'

import { useForm } from 'react-hook-form'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'

const Form = ({ form }) => {
	const { closeModal } = useModal()
	const { updateSectionByID } = useData()
	const { register, handleSubmit, reset, setValue } = useForm({ shouldUnregister: false })

	const onSubmit = (data) => {
		updateSectionByID(data)
		closeModal()
	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='custom-modal-dialog'>
					<div className='custom-modal-content'>
						<div className='custom-modal-header'>
							<h5 className='custom-modal-title'>Form</h5>
							<button
								aria-label='Close Modal'
								type='button'
								className='btn-close'
								onClick={closeModal}></button>
						</div>
						{React.cloneElement(form, { setValue: setValue, reset: reset, register: register })}
						<div className='custom-modal-footer'>
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
