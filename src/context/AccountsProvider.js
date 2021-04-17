import React, {createContext, useContext, useState, useEffect} from 'react'
import { useAuth } from 'context/AuthProvider'
import * as api from 'services/accounts'

const AccountsContext = createContext(null)

const AccountsProvider = ({children}) => {

    return (
        <AccountsContext.Provider value={{}}>
            {children}
        </AccountsContext.Provider>
    )
}

export default AccountsProvider
export { useAccounts }

const useAccounts = () => {
    try {
        return useContext(AccountsContext)
    } catch (e) {
        console.log(e)
    }
}