/** @format */

import React, { createContext, useState, useContext, createRef } from 'react'
import ModalWrapper from 'components/layout/Modal'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [open, setIsOpen] = useState(false)
	const [ModalComponent, setModalComponent] = useState(undefined)

	const insertComponent = (comp) => {
		setModalComponent(comp)
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
		setModalComponent(undefined)
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: { insertComponent, onClose },
	})

	return (
		<ModalContext.Provider value={{ insertComponent, onClose }}>
			{children}
			{ModalComponent && (
				<ModalWrapper open={open} onClose={onClose}>
					{ModalComponent}
				</ModalWrapper>
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
