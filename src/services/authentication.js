const register = (first_name, last_name, address_1, address_2 = null, zip_code, username, password) => {
    return fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, address_1, address_2, zip_code, username, password })
    })
}


export {
    register,
}

const login = (username, password) => {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    }).then((response) => response.json()).then(({ token, expires }) => ({ token, expires })).catch((err) => console.log(err))
}