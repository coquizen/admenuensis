/** @format */

import React, {useEffect, useRef} from 'react'
import Portal from './Portal/Portal'
import styles from './Modal.module.scss'
import classNames from "classnames"

const Modal = ({open, onClose, WrappedComponent}) => {
	const [active, setActive] = React.useState(false)
	let modalRef = useRef(null)
	useEffect(() => {
		const {current} = modalRef
		const transitionEnd = () => setActive(open);

		const keyHandler = (event) =>
			[27].indexOf(event.which) >= 0 && onClose(event);

		const clickHandler = (event) => event.target === current && onClose(event);

		if (current) {
			current.addEventListener("transitionend", transitionEnd);
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur();
				document.querySelector("#root").setAttribute("inert", "true");
				setActive(open);
			}, 0);
		}

		return () => {
			if (current) {
				current.removeEventListener("transitionend", transitionEnd);
				current.removeEventListener("click", clickHandler);
			}

			document.querySelector("#root").removeAttribute("inert");
			window.removeEventListener("keyup", keyHandler);
		}
	}, [open, onClose])

	return (<React.Fragment>
		{(open || active) &&
		<Portal className="portal-container">
			<div ref={modalRef} className={classNames(styles.ModalOverlay, (open && active) && styles.Active)}>
				<div className={styles.Modal}>
					{WrappedComponent}
				</div>

			</div>
		</Portal>}
	</React.Fragment>)
}

export default Modal