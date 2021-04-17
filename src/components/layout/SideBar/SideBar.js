/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faCog, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from 'context/AuthProvider'

import styles from './SideBar.module.scss'

const SideBar = () => {
	const { isAuthenticated, logout } = useAuth()
	return (
		<div className={classnames(styles.SideBar, !isAuthenticated() && styles.Hide)}>
			<div className={styles.SideBarLink}>
				{isAuthenticated() &&
				<Link to='/'>
					<FontAwesomeIcon icon={faHome} fixedWidth/>
				</Link>
				}
			</div>
			<div className={styles.SideBarLink}>
				{isAuthenticated() &&
				<Link to='/menu'>
					<FontAwesomeIcon icon={faClipboard} fixedWidth/>
				</Link>
				}
			</div>
			<div className={styles.SideBarLink}>
				{isAuthenticated() &&
				<Link to='/settings'>
					<FontAwesomeIcon icon={faCog} fixedWidth/>
				</Link>
				}
			</div>
			<div className={styles.SideBarLink}>
				{isAuthenticated() &&
				<Link to='/accounts'>
					<FontAwesomeIcon icon={faUserAlt} fixedWidth/>
				</Link>
				}
			</div>
			<div className={classnames(styles.SideBarLink, styles.SideBarLogout)}>
				{isAuthenticated() &&
				<Link to='/login' onClick={logout}>
					<FontAwesomeIcon icon={faSignOutAlt} fixedWidth/>
				</Link>
				}
			</div>
		</div>
	)
}
export default SideBar
