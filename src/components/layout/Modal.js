/** @format */

import React, { useRef, useEffect, useState } from 'react'
import Portal from './Portal'

const ModalWrapper = ({ open, onClose, title = 'Edit', children, ref }) => {
	const [active, setActive] = useState(false)
	const backdropRef = useRef(null)

	const closeModal = () => {
		setActive(false)
		onClose()
	}

	useEffect(() => {
		const { current } = backdropRef

		const transitionEnd = () => setActive(open)
		// if the event keypress is <esc>
		const keyHandler = (e) => [27].indexOf(e.which) >= 0 && closeModal()

		const clickHandler = (e) => e.target === current && closeModal()

		if (current) {
			current.addEventListener('transitionend', transitionEnd)
			current.addEventListener('click', clickHandler)
			window.addEventListener('keyup', keyHandler)
		}

		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur()
				setActive(open)
				document.querySelector('#root').setAttribute('inert', 'true')
			}, 10)
		}

		return () => {
			if (current) {
				current.removeEventListener('transitionend', transitionEnd)
				current.removeEventListener('click', clickHandler)
			}
			document.querySelector('#root').removeAttribute('inert')
			window.removeEventListener('keyup', keyHandler)
		}
	}, [open])

	return (
		<React.Fragment>
			{open && (
				<Portal className='modal-portal'>
					<div ref={backdropRef} className={`overlay ${active && open && 'active'}`}>
						<div className='modal-dialog modal-lg'>
							<div className='custom-modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title'>{title}</h5>
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
			)}
		</React.Fragment>
	)
}
export default ModalWrapper
