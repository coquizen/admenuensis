/** @format */

export const delay = (cb = () => {}, delay = 100) => {
	const timer = setTimeout(() => {
		clearTimeout(timer)
		cb()
	}, delay)
}
