/** @format */

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons'
import styles from './Handle.module.scss'


const Handle = ({ listeners, attributes }) => {
	return (
		<div {...listeners} {...attributes} className={styles.Handle}>
			<FontAwesomeIcon icon={faGripLinesVertical} fixedWidth />
		</div>
	)
}

export default Handle
