/** @format */
import React from 'react'

import { useForm } from 'react-hook-form'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'

const Form = ({ form }) => {
	const { closeModal } = useModal()
	const { updateSectionByID } = useData()
	const { register, handleSubmit } = useForm()

	const onSubmit = (data) => {
		updateSectionByID(data)
		closeModal()
	}
	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				{React.cloneElement(form, { register: register })}
				<div className='custom-modal-footer'>
					<button type='button' className='btn btn-secondary' onClick={closeModal}>
						Cancel
					</button>
					<button input='button' type='submit' className='btn btn-primary'>
						Save changes
					</button>
				</div>
			</form>
		</React.Fragment>
	)
}

export default Form
