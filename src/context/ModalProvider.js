/** @format */

import React, { createContext, useState, useContext, useRef, useLayoutEffect } from 'react'
import Portal from 'components/layout/Portal'
import useReactContextDevTool from 'hooks/useReactContextDevTool'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [ModalComponent, setModalComponent] = useState(undefined)
	const [closing, setClosing] = useState(false)
	const modalRef = useRef(null)

	useLayoutEffect(() => {
		const { current } = modalRef

		// if the event keypress is <esc>
		const keyHandler = (e) => [27].indexOf(e.which) >= 0 && closeModal()

		const clickHandler = (e) => e.target === current && closeModal()

		if (current) {
			current.addEventListener('click', clickHandler)
			window.addEventListener('keyup', keyHandler)
		}

		if (isOpen) {
			window.setTimeout(() => {
				document.activeElement.blur()
				document.querySelector('#root').setAttribute('inert', 'true')
			}, 10)
		}

		return () => {
			if (current) {
				current.removeEventListener('click', clickHandler)
			}
			document.querySelector('#root').removeAttribute('inert')
			window.removeEventListener('keyup', keyHandler)
		}
	}, [isOpen])

	const insertComponent = (comp) => {
		setModalComponent(comp)
		setIsOpen(true)
	}

	const closeModal = () => {
		setClosing(true)
	}

	const onClosingTransitionEnd = () => {
		if (closing) {
			setIsOpen(false)
			setClosing(false)
			setModalComponent(undefined)
		} else {
			setIsOpen(true)
		}
	}

	useReactContextDevTool({
		id: 'modal',
		displayName: 'Modal',
		values: { insertComponent, closeModal, closing, modalRef, isOpen },
	})

	return (
		<ModalContext.Provider value={{ insertComponent, closeModal }}>
			{children}
			{isOpen && (
				<Portal>
					<div
						ref={modalRef}
						className={`overlay ${closing ? 'close' : ''}`}
						onTransitionEnd={onClosingTransitionEnd}>
						{ModalComponent}
					</div>
				</Portal>
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
