/** @format */

import React, {useEffect, useRef} from 'react'
import Portal from './Portal/Portal'
import styles from './Modal.module.scss'
import classNames from "classnames"

const Modal = ({closeModal, isOpen, WrappedComponent}) => {
	const [fadeType, setFadeType] = React.useState('mounting')

	let modalRef = useRef(null)


	const setModalClosing = () => {
		setFadeType('out')
	}
	const setModalOpened = () => {
		setFadeType('in')
	}

	useEffect(() => {
		const {current} = modalRef

		const transitionEnd = (e) => {
			if (e.propertyName !== "opacity" || fadeType === 'in') return
			if (fadeType === 'out') closeModal()
		}
		
		const keyHandler = (event) => {
			const escapePressed = [27].indexOf(event.which) >= 0;
			if (escapePressed)
				setModalClosing(); // but the open state is still true see line 14. At the end of the fadeOut transition, the listener then sets the active state to be open .
			// return escapePressed && setActive(active => !active);// This toggles it
		}

		const clickHandler = (event) => event.target === current && setModalClosing();

		if (current) {
			current.addEventListener("transitionend", transitionEnd);
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		if (fadeType === 'mounting' && isOpen) {
		window.setTimeout(() => {
				document.activeElement.blur();
				document.querySelector("#root").setAttribute("inert", "true");
				setModalOpened()
		},10) 
	} else if (!isOpen) {
		setFadeType('mounting')
	}
		return () => {
			if (current) {
				current.removeEventListener("transitionend", transitionEnd);
				current.removeEventListener("click", clickHandler);
			}
			document.querySelector("#root").removeAttribute("inert");
			window.removeEventListener("keyup", keyHandler);
		}
	}, [isOpen, fadeType, closeModal])

	return (
		<React.Fragment>
			{isOpen &&
			<Portal className="portal-container">
				<div ref={modalRef} className={classNames(styles.ModalOverlay, fadeType === 'in' && styles.Active)}>
					<div className={styles.Modal}>
						{WrappedComponent}
					</div>
				</div>
			</Portal>}
	</React.Fragment>
	)
}

export default Modal