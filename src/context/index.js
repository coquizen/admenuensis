
import AuthProvider from './AuthProvider'
import DataProvider from './DataProvider'
import ModalProvider from './ModalProvider'
import AccountsProvider from './AccountsProvider'

const Providers = ({children}) => (
    <AuthProvider>
        <AccountsProvider>
            <DataProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </DataProvider>
        </AccountsProvider>s
    </AuthProvider>
)

export default Providers