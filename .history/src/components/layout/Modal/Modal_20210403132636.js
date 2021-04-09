/** @format */

import React, { useRef, useLayoutEffect } from 'react'
import Portal from '../Portal/Portal'

const Modal = ({ closing, onClosingTransitionEnd, closeModal, isOpen, children }) => {
	const modalRef = useRef(null)

	useLayoutEffect(() => {
		const { current } = modalRef

		// if the event keypress is <esc>
		const keyHandler = (e) => [ 27 ].indexOf(e.which) >= 0 && closeModal()

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
	}, [ isOpen ])

	// const onClosingTransitionEnd = () => {
	// 	if (!open) setActive(false)
	// }

	return (
		open && (
			<Portal>
				<div
					ref={modalRef}
					className={`overlay ${closing ? 'close' : ''}`}
					onTransitionEnd={onClosingTransitionEnd}>
					{children}
				</div>
			</Portal>
		)
	)
}
export default Modal
