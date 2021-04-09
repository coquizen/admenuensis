/** @format */

const headers = {
	'Content-Type': 'application/json',
}
export const authHeader = () => {
	const token = JSON.parse(localStorage.getItem('authToken'))
	if (token) {
		return { `Authorization`:
	};
} else {
	return { };
	}
}

export const fetchSections = () => {
	return fetch('/api/v1/sections')
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => console.error(error))
}

export const fetchSection = (id) => {
	return fetch(`/api/v1/sections/${id}`)
		.then((response) => response.json())
		.then((data) => data.data)
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
			authHeader(),
			headers,
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
		authHeader()
	})
		.then((response) => response.json())
		.then((data) => data.data)
		.catch((error) => {
			console.error(error)
		})
}

export const deleteSection = (id) => {
	return fetch('/api/v1/sections/${id}', {
		method: 'DELETE',
		headers,
		authHeader()
	})
}
export const deleteItem = (id) => {
	return fetch('/api/v1/items/${id}', {
		method: 'DELETE',
		headers,
		authHeader()
	})
}

export const fetchMenus = () => {
	return fetch(`/api/v1/menus`)
		.then((response) => response.json())
		.then((data) => data.data)
}
