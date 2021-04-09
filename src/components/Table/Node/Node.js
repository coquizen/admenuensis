/** @format */
import React, { memo, forwardRef, useState, useEffect, useLayoutEffect } from 'react'
import classNames from 'classnames'
import styles from './Node.module.scss'
import MiniSectionForm from './MiniSectionForm/MiniSectionForm'
import MiniItemForm from './MiniItemForm/MiniItemForm'
import { useData } from 'context/DataProvider'

const Node = memo(
	forwardRef(
		(
			{
				dataID,
				color,
				depth,
				dragOverlay,
				dragging,
				disabled,
				fadeIn,
				handle,
				height,
				index,
				listeners,
				attributes,
				renderItem,
				sorting,
				style,
				transition,
				transform,
				value,
				wrapperStyle,
				isSubSection,
				...props
			},
			ref
		) => {
			const { allData } = useData()
			useEffect(() => {
				if (!dragOverlay) {
					return
				}

				document.body.style.cursor = 'grabbing'

				return () => {
					document.body.style.cursor = ''
				}
			}, [dragOverlay])

			const type = Object.keys(allData).filter((key) => allData[key].find((node) => node.id === dataID))[0]

			// useLayoutEffect(() => {
			// 	if (type === 'section') {
			// 		if (index === 0) {
			// 			setIsSubSection(false)
			// 		} else {
			// 			setIsSubSection(true)
			// 		}
			// 	}
			// }, [index, type])

			return (
				<li
					className={classNames(
						styles.Wrapper,
						fadeIn && styles.fadeIn,
						sorting && styles.sorting,
						dragOverlay && styles.dragOverlay
					)}
					style={{
						...wrapperStyle,
						transition,
						'--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
						'--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
						'--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
						'--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
						'--index': index,
						'--color': color,
						'--margin-left': `${depth * 3}rem`,
					}}
					ref={ref}>
					<div
						className={classNames(
							styles.Item,
							dragging && styles.dragging,
							styles.withHandle,
							dragOverlay && styles.dragOverlay,
							disabled && styles.disabled,
							color && styles.color
						)}
						tabIndex={!handle ? 0 : undefined}
						style={style}
						data-cypress='draggable-item'
						{...props}>
						{type === 'section' && (
							<MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} />
						)}
						{type === 'item' && (
							<MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
						)}
					</div>
				</li>
			)
		}
	)
)

const Item = memo(
	forwardRef(
		(
			{
				dataUUID,
				color,
				dragOverlay,
				dragging,
				disabled,
				fadeIn,
				handle,
				height,
				index,
				listeners,
				attributes,
				renderItem,
				sorting,
				style,
				transition,
				transform,
				value,
				wrapperStyle,
				...props
			},
			ref
		) => {
			const { getItemDataByID } = useData()

			const itemData = getItemDataByID(dataUUID)
			useEffect(() => {
				if (!dragOverlay) {
					return
				}

				document.body.style.cursor = 'grabbing'

				return () => {
					document.body.style.cursor = ''
				}
			}, [dragOverlay])

			return (
				<li
					className={classNames(
						styles.Wrapper,
						fadeIn && styles.fadeIn,
						sorting && styles.sorting,
						dragOverlay && styles.dragOverlay
					)}
					style={{
						...wrapperStyle,
						transition,
						'--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
						'--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
						'--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
						'--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
						'--index': index,
						'--color': color,
					}}
					ref={ref}>
					<div
						className={classNames(
							styles.Item,
							dragging && styles.dragging,
							styles.withHandle,
							dragOverlay && styles.dragOverlay,
							disabled && styles.disabled,
							color && styles.color
						)}
						tabIndex={!handle ? 0 : undefined}
						style={style}
						data-cypress='draggable-item'
						{...props}>
						{itemData && <MiniItemForm dataUUID={dataUUID} listeners={listeners} attributes={attributes} />}
					</div>
				</li>
			)
		}
	)
)

export { Node }
