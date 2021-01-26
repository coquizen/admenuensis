/** @format */

import React, { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './List.module.scss'

const List = forwardRef(({ children, columns = 1, horizontal, style }, ref) => {
	return (
		<ul
			ref={ref}
			style={{
				...style,
				'--columns': columns,
			}}
			className={classNames(styles.List, horizontal && styles.horizontal)}>
			{children}
		</ul>
	)
})

export { List }
