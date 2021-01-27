/** @format */

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useDroppable,
	useSensors,
	useSensor,
} from '@dnd-kit/core'
import {
	SortableContext,
	useSortable,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	rectSwappingStrategy,
} from '@dnd-kit/sortable'

import { Item, List, SortableItemWrapper } from 'components/Table'

function DroppableContainer({ children, columns = 1, id, items, getStyle = () => ({}) }) {
	const { over, isOver, setNodeRef } = useDroppable({
		id,
	})
	const isOverContainer = isOver || (over ? items.includes(over.id) : false)

	return (
		<List ref={setNodeRef} style={getStyle({ isOverContainer })} columns={columns}>
			{children}
		</List>
	)
}

const defaultContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const VOID_ID = 'void'

const Table = ({
	collisionDetection = closestCorners,
	getItemStyles = () => ({}),
	getContainerStyle = defaultContainerStyle,
	wrapperStyle = () => ({}),
	modifiers,
	renderItem,
	trashable,
	strategy = rectSwappingStrategy,
}) => {
	const [menuData, setMenuData] = useState({})
	const [dragOverlaydItems, setClonedItems] = useState(null)
	const [activeId, setActiveId] = useState(null)
	const [overIndex, setOverIndex] = useState(null)

	useEffect(() => {
		fetch('/mapped-sections')
			.then((response) => response.json())
			.then(({ data }) => {
				var amendedData = {}
				Object.keys(data).forEach((parentID) => {
					console.log(data)
					amendedData[parentID] = []
					data[parentID].forEach((item) => {
						amendedData[parentID].push(item.id)
					})
				})
				amendedData[VOID_ID] = []
				setMenuData(amendedData)
			})
	}, [])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)
	const findContainer = (id) => {
		if (id in menuData) {
			return id
		}

		return Object.keys(menuData).find((key) => menuData[key].includes(id))
	}

	const getIndex = (id) => {
		const container = findContainer(id)

		if (!container) {
			return -1
		}

		const index = menuData[container].indexOf(id)

		return index
	}

	const handleDragStart = ({ active }) => {
		setActiveId(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {
		const overId = over.id || VOID_ID
		setOverIndex(overId)
		const overContainer = findContainer(overId)

		const activeContainer = findContainer(active.id)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeContainer !== overContainer) {
			setMenuData((items) => {
				const activeItems = items[activeContainer]
				const overItems = items[overContainer]
				const overIndex = overItems.indexOf(overId)
				const activeIndex = activeItems.indexOf(active.id)

				let newIndex

				if (overId in items) {
					newIndex = overItems.length + 1
				} else {
					const isBelowLastItem =
						over &&
						overIndex === overItems.length - 1 &&
						draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

					const modifier = isBelowLastItem ? 1 : 0

					newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
				}

				return {
					...items,
					[activeContainer]: [...items[activeContainer].filter((item) => item !== active.id)],
					[overContainer]: [
						...items[overContainer].slice(0, newIndex),
						items[activeContainer][activeIndex],
						...items[overContainer].slice(newIndex, items[overContainer].length),
					],
				}
			})
		}
	}

	const handleDragEnd = ({ active, over }) => {
		const activeContainer = findContainer(active.id)

		if (!activeContainer) {
			setActiveId(null)
			return
		}

		const overId = over.id || VOID_ID

		if (overId === VOID_ID) {
			setMenuData((items) => ({
				...(trashable && over.id === VOID_ID ? items : dragOverlaydItems),
				[VOID_ID]: [],
			}))
			setActiveId(null)
			return
		}

		const overContainer = findContainer(overId)

		if (activeContainer && overContainer) {
			const activeIndex = menuData[activeContainer].indexOf(active.id)
			const overIndex = menuData[overContainer].indexOf(overId)

			if (activeIndex !== overIndex) {
				setMenuData((items) => ({
					...items,
					[overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
				}))
			}
		}

		setActiveId(null)
	}

	const handleDragCancel = () => {
		if (dragOverlaydItems) {
			// Reset items to their original state in case items have been
			// Dragged across containrs
			setMenuData(dragOverlaydItems)
		}

		setActiveId(null)
		setClonedItems(null)
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={collisionDetection}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
			modifiers={modifiers}>
			<div className='table-view'>
				{Object.keys(menuData)
					.filter((key) => key !== VOID_ID)
					.map((containerId) => (
						<SortableContext key={containerId} items={menuData[containerId]} strategy={strategy}>
							<DroppableContainer
								id={containerId}
								items={menuData[containerId]}
								getStyle={getContainerStyle}>
								{menuData[containerId].map((item, index) => {
									return (
										<SortableItemWrapper
											key={item}
											id={item}
											index={index}
											style={getItemStyles}
											wrapperStyle={wrapperStyle}
											renderItem={renderItem}
											containerId={containerId}
											getIndex={getIndex}
											value={item}
										/>
									)
								})}
							</DroppableContainer>
						</SortableContext>
					))}
			</div>
			{createPortal(
				<DragOverlay>
					{activeId ? (
						<Item
							value={activeId}
							style={getItemStyles({
								containerId: findContainer(activeId),
								overIndex: -1,
								index: getIndex(activeId),
								width: overIndex !== 0 ? '80%' : '100%',
								transition: 'width 300ms',
								value: activeId,
								isSorting: activeId !== null,
								isDragging: true,
								isDragOverlay: true,
							})}
							index={getIndex(activeId)}
							wrapperStyle={wrapperStyle({ index: 0 })}
							renderItem={renderItem}
							dragOverlay
						/>
					) : null}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	)
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

function Trash() {
	const { setNodeRef, isOver } = useDroppable({
		id: VOID_ID,
	})

	return (
		<div
			ref={setNodeRef}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'fixed',
				left: '50%',
				marginLeft: -150,
				bottom: 20,
				width: 300,
				height: 60,
				borderRadius: 5,
				border: '1px solid',
				borderColor: isOver ? 'red' : '#DDD',
			}}>
			Drop here to delete
		</div>
	)
}

export default Table
