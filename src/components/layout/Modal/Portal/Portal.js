/** @format */

import {useEffect, useMemo} from 'react'
import {createPortal} from 'react-dom'

export default function Portal({children, className}) {
	// Create div to contain everything
	const el = useMemo(() => document.createElement('div'), [])
	// On mount function
	useEffect(() => {
		// work out target in the DOM based on parent prop
		const target = document.body;
		const classList = ["modal-root"]

		if (className) className.split(" ").forEach((item) => classList.push(item))

		classList.forEach((item) => el.classList.add(item))

		target.appendChild(el)

		return () => {
			target.removeChild(el)
		};
	}, [el, className])
	// return the createPortal function
	return createPortal(children, el)
}