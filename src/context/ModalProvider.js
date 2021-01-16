/** @format */

import React, { createContext, useState, useContext, createRef } from 'react'
import Modal from 'components/layout/Modal'
import SectionForm from 'components/menu/SectionForm'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext()

const modalTypes = {
	SectionForm,
}

const MODAL_TYPES = {
	section: modalTypes.SectionForm,
}

const ModalProvider = ({ children }) => {
	const [open, setIsOpen] = useState(false)
	const [ModalComponent, setModalComponent] = useState(undefined)
	const modalRef = createRef()
	let modalChildren
	const insertComponent = (comp) => {
		setModalComponent(MODAL_TYPES[comp])
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
		setModalComponent(undefined)
	}

	if (open) {
		modalChildren = <ModalComponent ref={modalRef} />
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: { insertComponent, onClose },
	})
	return (
		<ModalContext.Provider value={{ insertComponent: insertComponent, onClose: onClose }}>
			{children}
			<Modal open={open} onClose={onClose} children={modalChildren} />
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

export { useModal, ModalProvider, ModalContext }
