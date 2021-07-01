import React, {createContext, useContext} from 'react'


const AccountsContext = createContext(null)

const AccountsProvider = ({children}) => {

    return (
        <AccountsContext.Provider value={{}}>
            {children}
        </AccountsContext.Provider>
    )
}


const useAccounts = () => {
    try {
        return useContext(AccountsContext)
    } catch (e) {
        console.log(e)
    }
}


export default AccountsProvider
export { useAccounts }