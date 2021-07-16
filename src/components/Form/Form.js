/** @format */
import React from 'react'
import styles from './Form.module.scss'
import {useForm} from 'react-hook-form'
import {updateSection} from 'services/data'
import {useModal} from 'context/ModalProvider'
import classnames from "classnames";

const Form = ({form, label}) => {
	const {closeModal} = useModal()
	const {register, handleSubmit, reset, setValue} = useForm({shouldUnregister: false})

	const onSubmit = (data) => {
		console.info(data)
		updateSection(data).then((response) => {
			console.info(response)
		})
		closeModal()
	}

	if (form === undefined) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.FormContainer}>
				<div className={styles.FormHeader}>
					<div>{label}</div>
					<button
						aria-label='Close Modal'
						type='button'
						className={styles.CloseButton}
						onClick={closeModal}/>
				</div>

				<div className={styles.FormBody}>
					{React.cloneElement(form, {setValue: setValue, reset: reset, register: register})}
				</div>
				<div className={styles.FormFooter}>
					<div className={styles.ButtonGroup}>
						<button type='button' className={classnames(styles.Button, styles.ButtonCancel)}
								onClick={closeModal}>Cancel
						</button>
						<button type='submit' className={classnames(styles.Button, styles.ButtonSubmit)}>Save
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Form
