/** @format */

import React, { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './List.module.scss'

const List = forwardRef(({ children, style }, ref) => {
	return (
		<ul
			ref={ref}
			style={{
				...style,
			}}
			className={classNames(styles.List)}>
			{children}
		</ul>
	)
})

export { List }
