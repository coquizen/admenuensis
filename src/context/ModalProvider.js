/** @format */

import React, { createContext, useState, useContext, createRef } from 'react'
import Modal from 'components/layout/Modal'
import { SectionForm } from 'components/forms'
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
	const [propsData, setPropsData] = useState(null)
	const [ModalComponent, setModalComponent] = useState(null)
	const modalRef = createRef()

	let ModalChildren

	const insertComponent = (comp, data) => {
		console.log(`comp: ${comp}`)
		setModalComponent(MODAL_TYPES[comp])
		setPropsData(data)
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
		setModalComponent(undefined)
	}

	if (open) {
		ModalChildren = () => <ModalComponent ref={modalRef} data={propsData} />
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: { insertComponent, onClose },
	})
	return (
		<ModalContext.Provider value={{ insertComponent, onClose }}>
			{children}
			<Modal open={open} onClose={onClose}>
				{ModalChildren && <ModalChildren />}
			</Modal>
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
