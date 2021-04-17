import React from 'react'
import DataProvider from "../../context/DataProvider";
import ModalProvider from "../../context/ModalProvider";
import AuthProvider from "../../context/AuthProvider";
import AccountsProvider from "../../context/AccountsProvider"

const ProviderContainer = ({children}) => (
    <AuthProvider>
        <AccountsProvider>
            <DataProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </DataProvider>
        </AccountsProvider>
    </AuthProvider>
)

export default ProviderContainer