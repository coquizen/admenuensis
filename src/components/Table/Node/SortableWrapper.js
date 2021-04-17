/** @format */

// import React from 'react';
import React, { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Node } from 'components/Table/Node'

const SortableNodeWrapper = ({
	id,
	dataID,
	type,
	index,
	handle,
	depth,
	style,
	containerId,
	getIndex = () => ({}),
	wrapperStyle = () => ({}),
	renderItem,
	isSubSection,
	value,
	...props
}) => {
	const { setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition } = useSortable({ id })

	const mounted = useMountStatus()
	const mountedWhileDragging = isDragging && !mounted
	const unmounting = !isDragging && !mounted
	return (
		<Node
			dataID={dataID}
			depth={depth}
			type={type}
			ref={setNodeRef}
			value={value}
			dragging={isDragging}
			handle={handle}
			index={index}
			wrapperStyle={wrapperStyle({ index })}
			style={style({
				index,
				value: dataID,
				isDragging,
				isSorting,
				overIndex: over ? getIndex(over.id) : overIndex,
				containerId,
			})}
			fadeIn={mountedWhileDragging}
			fadeOut={unmounting}
			transition={transition}
			transform={transform}
			listeners={listeners}
			renderItem={renderItem}
			isSubSection={isSubSection}
		/>
	)
}

const useMountStatus = () => {
	const [ isMounted, setIsMounted ] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500)
		return () => clearTimeout()
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

export default SortableNodeWrapper
