/** @format */

export const fetchSections = () => {
	return fetch('/sections')
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const fetchMappedSections = () => {
	return fetch('/mapped-sections')
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const fetchSectionByID = (id) => {
	return fetch(`/sections/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
}

export const fetchItemByID = (id) => {
	return fetch(`/items/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const updateSectionByID = (id, data) => {
	return fetch(`/sections/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => {
			console.error(error)
		})
}

export const updateItemByID = (id, data) => {
	return fetch(`/items/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => {
			console.error(error)
		})
}
