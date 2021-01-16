/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faCog } from '@fortawesome/free-solid-svg-icons'
const SideBar = () => {
	return (
		<div className='sidebar-container'>
			<div className='sidebar-link'>
				<Link to='/'>
					<FontAwesomeIcon icon={faHome} fixedWidth />
				</Link>
			</div>
			<div className='sidebar-link'>
				<Link to='/menu'>
					<FontAwesomeIcon icon={faClipboard} fixedWidth />
				</Link>
			</div>
			<div className='sidebar-link'>
				<Link to='/settings'>
					<FontAwesomeIcon icon={faCog} fixedWidth />
				</Link>
			</div>
		</div>
	)
}
export default SideBar
