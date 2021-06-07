/** @format */

import React, {createContext, useContext, useEffect, useState} from 'react'
import Modal from 'components/layout/Modal'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext(undefined)

const ModalProvider = ({children}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [ModalWrappedComponent, setModalWrappedComponent] = useState(null)

	useEffect(() => {
		if (ModalWrappedComponent) {
			setIsOpen(true)
		}
	}, [ModalWrappedComponent])

	const insertComponent = (comp) => {
		setModalWrappedComponent(comp)
	}

	const closeModal = (event) => {
		event.preventDefault()
		setIsOpen(false)
		setModalWrappedComponent(null)
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: {insertComponent, ModalWrappedComponent, isOpen},
	})

	return (
		<ModalContext.Provider value={{insertComponent, closeModal}}>
			{children}
			<Modal onClose={closeModal} open={isOpen} WrappedComponent={ModalWrappedComponent}/>
		</ModalContext.Provider>
	)
}

const useModal = () => {
	try {
		return useContext(ModalContext)
	} catch (err) {
		console.error(err)
	}
}

export default ModalProvider
export { useModal }
