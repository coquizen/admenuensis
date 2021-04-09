/** @format */

import React, { useRef, useEffect, useState } from 'react'
import Portal from './Portal'

const ModalWrapper = ({ open, onClose, title = 'Edit', children, ref }) => {
	const [closing, setClosing] = useState(false)
	const modalRef = useRef(null)

	const closeModal = () => {
		setClosing(true)
	}
	useEffect(() => {
		const { current } = modalRef

		// if the event keypress is <esc>
		const keyHandler = (e) => [27].indexOf(e.which) >= 0 && closeModal()

		const clickHandler = (e) => e.target === current && closeModal()

		if (current) {
			current.addEventListener('click', clickHandler)
			window.addEventListener('keyup', keyHandler)
		}

		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur()
				setClosing(open)
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
	}, [open])

	const onClosingAnimationEnd = () => {
		if (closing) onClose()
	}

	// const onClosingTransitionEnd = () => {
	// 	if (!open) setActive(false)
	// }

	return (
		open && (
			<Portal className='modal-portal'>
				<div
					ref={backdropRef}
					className={`overlay ${closing ? 'close' : ''}`}
					onanimationend={onClosingAnimationEnd}>
					<div className='custom-modal-dialog'>
						<div className='custom-modal-content'>
							<div className='custom-modal-header'>
								<h5 className='custom-modal-title'>{title}</h5>
								<button
									aria-label='Close Modal'
									type='button'
									className='btn-close'
									onClick={onClose}></button>
							</div>
							{children}
						</div>
					</div>
				</div>
			</Portal>
		)
	)
}
export default ModalWrapper
