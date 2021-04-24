/** @format */

import React, { useRef, useLayoutEffect } from 'react'
import classnames from 'classnames'
import Portal from '../Portal/Portal'
import styles from './Modal.module.scss'

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

	return (
		<Portal>
			<div
				ref={modalRef}
				className={classnames(styles.Overlay, closing && styles.Close)}
				onTransitionEnd={onClosingTransitionEnd}>
				{children}
			</div>
		</Portal>
	)
}
export default Modal
