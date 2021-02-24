/** @format */

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VscGripper } from 'react-icons/vsc'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import styles from './Handle.module.scss'

const Handle = ({ listeners, attributes }) => {
	return (
		<div {...listeners} {...attributes} className={styles.Handle}>
			<VscGripper size='1.25em' />
		</div>
	)
}

export default Handle
