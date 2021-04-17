import React, {useEffect, useState} from 'react'
import { useAccounts } from 'context/AccountsProvider'
import * as api from "../../services/accounts";
import styles from './Accounts.module.scss'
const Accounts = () => {
    const [accounts, setAccounts] = useState()
    const [isDirty, setIsDirty] = useState(true)

    useEffect(() => {
        if (isDirty) {
            api.listAccounts().then(data => setAccounts(data))
            setIsDirty(false)
        }}, [isDirty])

    return (
        <div className={styles.Accounts}>
            <div className={styles.AccountsHeader}>Accounts</div>
            <div className={styles.AccountsBody}>
                {accounts ?
                    <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Zip Code</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <ListAccounts data={accounts} />
                </tbody>
                    </table>: <div> loading .... </div>}
            </div>
        </div>
    )
}

const ListAccounts = ({data}) => {
    return data.map((account) => (
                <tr key={account.id}>
                    <td>{account.user.first_name}</td>
                    <td>{account.user.last_name}</td>
                    <td>{account.user.address_1}</td>
                    {account.user.address_2 !== undefined ? <td>{account.user.address_2}</td> : <td></td>}
                    <td>{account.user.zip_code}</td>
                    <td>{account.user.email}</td>
                    <td>{account.user.phone}</td>
                    <td>{account.username}</td>
                    <td>{account.role}</td>
                </tr>
            ))

}
export default Accounts