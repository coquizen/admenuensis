/** @format */

import React, { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './List.module.scss'

const List = forwardRef(({ children, style }, ref) => {
	return (
		<div
			ref={ref}
			style={{
				...style,
			}}
			className={classNames(styles.List)}>
			{children}
		</div>
	)
})

export default List
