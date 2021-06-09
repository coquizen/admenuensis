/** @format */

import React, {createContext, useContext, useEffect, useState} from 'react'
import Modal from 'components/layout/Modal'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext(undefined)

const ModalProvider = ({children}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [ModalWrappedComponent, setModalWrappedComponent] = useState(null)

	const reload=()=>window.location.reload();
	
	useEffect(() => {
		if (ModalWrappedComponent !== null) {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [ModalWrappedComponent])

	const insertComponent = (comp) => {
		setModalWrappedComponent(comp)
	}

	const closeModal = (event) => {
		event.preventDefault()
		setModalWrappedComponent(null)
		reload()
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
