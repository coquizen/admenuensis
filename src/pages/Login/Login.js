import React, { useState, useLayoutEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from 'context/AuthProvider'
import styles from './Login.module.scss'
import classnames from 'classnames'

const Login = () => {
    const [ loginState, setLoginState ] = useState(null)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const history = useHistory();
    const location = useLocation();

    const { isAuthenticated, setAuthState, login, authState, logout } = useAuth()

    const resetForm = () => {
        setTimeout(() => {
            setLoginState(null)
        }, 2000);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoginState('pending')
        login(username, password).then(() => {
            setLoginState('resolved')
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
        }).catch((err) => {
            setLoginState('rejected')
            setPassword('')
            console.info(username, password, loginState)
        })
    }

    return (
        <div className={styles.LoginWrapper}>
            <div className={styles.LoginContainer}>
                <div className={styles.LoginHeader}>
                    <div className={styles.LoginTitle}>Login</div>
                </div>
                <form onSubmit={onSubmit} value="Submit" autoComplete="off">
                    <div className={styles.LoginBody}>
                        <div className={styles.LoginInputs}>
                            <label htmlFor="username" className={styles.Label}>Username</label>
                            <input type="text" name="username" className={styles.LoginInput} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username..." value={username} />
                            <br />
                            <label htmlFor="password" className={styles.Label}>Password</label>
                            <input type="password" name="password" className={styles.LoginInput} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password..." value={password} />
                            {loginState === 'Rejected' && <span className={styles.Rejected}>Password incorrect</span>}
                        </div>
                    </div>
                    <div className={styles.LoginFooter}>
                        <div className={styles.ButtonGroup}>
                            <button type="button" className={classnames('btn', styles.Button, styles.ButtonCancel)} onClick={resetForm}>Cancel</button>
                            <button type="submit" className={classnames('btn', styles.Button, styles.ButtonSubmit)}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login