/** @format */

// import React from 'react';
import React, { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Item } from 'components/Table/Item'

const SortableItemWrapper = ({
	id,
	index,
	handle,
	style,
	containerId,
	getIndex,
	wrapperStyle = () => ({}),
	renderItem,
	value,
	...props
}) => {
	const { setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition } = useSortable({
		id,
	})

	const mounted = useMountStatus()
	const mountedWhileDragging = isDragging && !mounted

	return (
		<Item
			itemID={id}
			ref={setNodeRef}
			value={value}
			dragging={isDragging}
			sorting={isSorting}
			handle={handle}
			index={index}
			wrapperStyle={wrapperStyle({ index })}
			style={style({
				index,
				value: id,
				isDragging,
				isSorting,
				overIndex: over ? getIndex(over.id) : overIndex,
				containerId,
			})}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
			renderItem={renderItem}
		/>
	)
}

const useMountStatus = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500)

		return () => clearTimeout(timeout)
	}, [])

	return isMounted
}

function getColor(id) {
	switch (id) {
		case 'a':
			return '#7193f1'
		case 'b':
			return '#ffda6c'
		case 'c':
			return '#00bcd4'
		case 'd':
			return '#ef769f'
		default:
			return undefined
	}
}
export default SortableItemWrapper
