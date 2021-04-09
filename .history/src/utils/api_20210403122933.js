/** @format */

const headers = {
	'Content-Type': 'application/json',
}
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

export const fetchSection = (id) => {
	return fetch(`/sections/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
}

export const reSortTable = (activeID, overID, isBefore) => {
	return fetch(`/swap-sections`, {
		method: 'PATCH',
		headers,
		body: JSON.stringify({ activeID, overID, isBefore }),
	})
}

export const fetchItems = () => {
	return fetch(`/items`)
		.then((response) => response.json())
		.then((data) => data.data)
}
export const fetchItem = (id) => {
	return fetch(`/items/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const updateSection = (data) => {
	return fetch(`/sections/${data.id}`, {
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

export const updateItem = (data) => {
	return fetch(`/items/${data.id}`, {
		method: 'PATCH',
		headers,
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => {
			console.error(error)
		})
}
