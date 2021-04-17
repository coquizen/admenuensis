export const authHeader = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
        }
    } else {
        return {};
    }
}

export const listAccounts = () => {
    return fetch('/accounts', {
        method: 'GET',
        headers: authHeader()
    }).then((res) => res.json()).then(data => data.data)
}

export const updateAccount = (data) => {
    return fetch('/accounts/:id', {
        method: 'PATCH',
        headers: authHeader()
    }).then((res) => res.json()).then(data => data.data)
}
