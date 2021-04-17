import React, { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import useReactContextDevTool from "hooks/useReactContextDevTool";
import { useInput } from 'hooks'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const expiresAt = localStorage.getItem('expiresAt')

    const [ authState, setAuthState ] = useState({
        token,
        expiresAt,
        error: null
    })
    const [isAuthorized, setIsAuthorized ] = useState(false)

    const setAuthInfo = ({ token, expiresAt, error}) => {
        if (!error) {
            setTimeout(() => {
                localStorage.setItem('token', token)
                localStorage.setItem('expiresAt', expiresAt)
            }, 2000)
            setAuthState({token, expiresAt, error: null})
        } else {
            setAuthState({token: null, expiresAt: null, error})
        }}


    const isAuthenticated = () => {
        if (authState.error) {
            return false
        } else {
            return new Date().getTime() / 1000 < authState.expiresAt
        }
    }

    const login = (username, password) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})})
                .then(response => response.json())
                .then(({token, expiry}) => {
                    setAuthInfo({token: token, expiresAt: expiry})}).then(() => setIsAuthorized(true))
            .catch((err) => {
                console.error(err)
                setAuthInfo({token: null, expiresAt: null})
                setIsAuthorized(false)
            })
    }

    const confirmLogOut = () => {
        const message = 'Are you sure you want to logout? Any unsaved changes will be lost'
        const confirm = window.confirm(message)
        if (confirm) {
            return true
        }
    }

    const logout = () => {
        if (!confirmLogOut()) {
            return
        }
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')

        setAuthState({
            token: null,
            expiresAt: null,
            error: null
        })
        setIsAuthorized(false)
    }

    const authHeader = () => {
        const token = JSON.parse(localStorage.getItem('authToken'))
        if (token) {
            return {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            }
        } else {
            return {};
        }
    }

    useReactContextDevTool({
        id: 'authentication',
        displayName: 'Authentication',
        values: { isAuthenticated, token, expiresAt, authState, isAuthorized },
    })

    return (
        <AuthContext.Provider value={{
            authHeader,
            setAuthState: (authInfo) => setAuthInfo(authInfo),
            isAuthenticated,
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    try {
        return useContext(AuthContext)
    } catch (e) {
        console.log(e)
    }
}

export default AuthProvider
export { useAuth }
