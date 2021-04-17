import React from 'react'
import AuthProvider from './AuthProvider'
import DataProvider from './DataProvider'
import ModalProvider from './ModalProvider'
import AccountsProvider from './AccountsProvider'

export default ({children}) => (
    <AuthProvider>

            <DataProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </DataProvider>

    </AuthProvider>
)

