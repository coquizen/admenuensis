/** @format */

import React, { createContext, useState, useContext } from 'react'
import { Modal } from 'components/layout'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [ isOpen, setIsOpen ] = useState(false)
	const [ ModalComponent, setModalComponent ] = useState(undefined)
	const [ closing, closeModal ] = useState(false)

	const insertComponent = (comp) => {
		setModalComponent(comp)
		setIsOpen(true)
	}

	const onClosingTransitionEnd = () => {
		if (closing) {
			setIsOpen(false)
			closeModal(false)
			setModalComponent(undefined)
		} else {
			setIsOpen(true)
		}
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: { insertComponent, closeModal, closing, isOpen },
	})

	return (
		<ModalContext.Provider value={{ insertComponent, closeModal }}>
			{children}
			{isOpen && (
				<Modal closing={closing}
					closeModal={() => closeModal(true)}
					isOpen={isOpen}
					onClosingTransitionEnd={onClosingTransitionEnd}>
					{ModalComponent}
				</Modal>
			)}
		</ModalContext.Provider>
	)
}

const useModal = () => {
	try {
		return useContext(ModalContext)
	} catch (e) {
		console.log(e)
	}
}

export default ModalProvider
export { useModal }
