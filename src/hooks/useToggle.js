/** @format */

import {useCallback, useState} from 'react'

// Toggles between true or false
function useToggle(initialValue = false) {
	const [open, setOpen] = useState(initialValue)

	return [open, useCallback(() => setOpen((status) => !status), [])]
}

export default useToggle
