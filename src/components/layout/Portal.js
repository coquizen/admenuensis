/** @format */

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children, parent }) {
	// Create div to contain everything
	const el = document.createElement('div')
	// On mount function
	useEffect(() => {
		// work out target in the DOM based on parent prop
		const target = document.body
		el.setAttribute('id', 'modal-root')
		// Default classes

		// Append element to dom
		target.appendChild(el)
		// On unmount function
		return () => {
			// Remove element from dom
			target.removeChild(el)
		}
	}, [el, parent])
	// return the createPortal function
	return createPortal(children, el)
}
