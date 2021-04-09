/** @format */

const headers = {
	'Content-Type': 'application/json',
}
export const fetchSections = () => {
	return fetch('/api/v1/sections')
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
	return fetch(`/api/v1/sections/${id}`)
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
	return fetch(`/api/v1/items`)
		.then((response) => response.json())
		.then((data) => data.data)
}
export const fetchItem = (id) => {
	return fetch(`/api/v1/items/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const updateSection = (data) => {
	return fetch(`/api/v1/sections/${data.id}`, {
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
	return fetch(`/api/v1/items/${data.id}`, {
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
