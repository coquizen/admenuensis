export const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
        return {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
        }
    } else {
        return {};
    }
}

// export const fetchMenus = () => {
// 	return fetch(`/api/v1/menus`).then((response) => response.json())
// }

export const fetchMenus = () => {
    return fetch(`/api/v1/menus`)
        .then((response) => response.json())
}

export const fetchSections = () => {
    return fetch('/api/v1/sections')
        .then((response) => response.json())
}

export const fetchSection = (id) => {
    return fetch(`/api/v1/sections/${id}`)
        .then((response) => response.json())
}

export const fetchItems = () => {
    return fetch(`/api/v1/items`)
        .then((response) => response.json())
}
export const fetchItem = (id) => {
    return fetch(`/api/v1/items/${id}`)
        .then((response) => response.json())
}

export const createSection = (data) => {
    return fetch(`/api/v1/sections`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data),
    }).then((response) => response.json())
}

export const updateSection = (data) => {
    return fetch(`/api/v1/sections/${data.id}`, {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify(data),
    }).then((response) => response.json())
}

export const updateItem = (data) => {
    return fetch(`/api/v1/items/${data.id}`, {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error)
        })
}

export const deleteSection = (id) => {
    return fetch(`/api/v1/sections/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
    }).then(response => response.json())
}
export const deleteItem = (id) => {
    return fetch(`/api/v1/items/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
    }).then(response => response.json())
}


