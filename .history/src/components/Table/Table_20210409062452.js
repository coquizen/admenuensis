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
import { fetchMenus, updateSection, updateItem } from 'services/data'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { List, SortableNodeWrapper, Node } from 'components/Table'
import { useData } from 'context/DataProvider'
import { flattenRoot } from 'utils/flattenTree'


const DroppableContainer = ({ children, columns = 1, id, items, getStyle = () => ({}) }) => {
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
	marginTop: '2rem',
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const iconContainerStyle = ({ isOverContainer }) => ({
	marginTop: '-1rem',
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
	strategy = verticalListSortingStrategy,
}) => {
	const [ isBefore, setIsBefore ] = useState(false)
	const [ menuData, setMenuData ] = useState([])
	const [ dragOverlaydItems, setClonedItems ] = useState(null)
	const [ activeId, setActiveId ] = useState(null)
	const [ overIndex, setOverIndex ] = useState(null)

	useEffect(() => {
		var flattened = []
		var fetchedMenuData = fetchMenus()
		fetchedMenuData.forEach((root) => flattened.push(flattenRoot(root)))
		setMenuData(flattened)
	}, [ menuData ])
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const findContainer = (id) => Object.keys(menuData).filter((key) => menuData[ key ].find((node) => node.id === id))[ 0 ]

	const getIndex = (id) => {
		const container = findContainer(id)
		if (!container) {
			return -1
		}

		const index = menuData[ container ].map((obj, index) => { if (obj.id === id) { return index } })

		return index
	}

	const handleDragStart = ({ active }) => {
		setActiveId(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {
		const overId = over.id || VOID_ID

		const overContainer = findContainer(overId)

		const activeContainer = findContainer(active.id)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeContainer !== overContainer) {
			setMenuData((menuData) => {
				const activeItemsID = menuData[ activeContainer ].map((item) => item.id)
				const overItemsID = menuData[ overContainer ].map((item) => item.id)
				const overindex = overItemsID.indexOf(overId)
				const activeIndex = activeItemsID.indexOf(active.id)

				let newIndex

				if (overId in menuData) {
					newIndex = overItemsID.length + 1
				} else {
					const isBelowLastItem =
						over &&
						overindex === overItemsID.length - 1 &&
						draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

					const modifier = isBelowLastItem ? 1 : 0
					console.log(modifier)
					setIsBefore(!modifier)
					newIndex = overindex >= 0 ? overindex + modifier : overItemsID.length + 1
				}


				console.log(newIndex)
				menuData[ overContainer ].splice(newIndex, 0, menuData[ activeContainer ][ activeIndex ])
				menuData[ activeContainer ] = [ ...menuData[ activeContainer ].filter((item) => item.id !== active.id) ]
				console.log(menuData)
				return menuData
			}
			)
		}
	}

	const handleDragEnd = ({ active, over }) => {
		const activeContainer = findContainer(active.id)
		console.log(`active.id: ${active.id}`)
		console.log(`over.id: ${over.id}`)
		console.log(`activeContainer: ${activeContainer}`)

		if (!activeContainer) {
			setActiveId(null)
			return
		}

		const overId = over.id || VOID_ID

		// Trash
		// if (overId === VOID_ID) {
		// 	setMenuData((menuData) => ({
		// 		...(trashable && over.id === VOID_ID ? menuData : dragOverlaydItems),
		// 		[VOID_ID]: [],
		// 	}))
		// 	setActiveId(null)
		// 	return
		// }

		const overContainer = findContainer(overId)

		if (activeContainer && overContainer) {
			const activeIndex = menuData[ activeContainer ].map((item) => item.id).indexOf(active.id)
			const overIndex = menuData[ overContainer ].map((item) => item.id).indexOf(overId)

			if (activeIndex !== overIndex) {
				setMenuData((menuData) => {
					menuData[ overContainer ] = arrayMove(menuData[ overContainer ], activeIndex, overIndex)
					return menuData
				})
			}
		}
		// reSortTable(activeId, overId, isBefore)
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
				{menuData &&
					menuData.map((container, index) => {
						return (
							<SortableContext
								key={container[ 0 ].id}
								id={container[ 0 ].title}
								items={container.map(({ id }) => id)}
								strategy={strategy}>
								<DroppableContainer
									items={container.filter(({ id }) => id)}
									getStyle={getContainerStyle}>
									{container.map((child, index) => (
										<>
											<SortableNodeWrapper
												id={child.id}
												key={child.title}
												dataID={child.id}
												depth={child.depth}
												index={index}
												style={getItemStyles}
												wrapperStyle={wrapperStyle}
												renderItem={renderItem}
												getIndex={() => getIndex(child.id)}
											/>
										</>
									))}
								</DroppableContainer>
							</SortableContext>
						)
					})}
			</div>
			{createPortal(
				<DragOverlay>
					{activeId ? (
						<Node
							dataID={activeId}
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
							wrapperStyle={wrapperStyle(getIndex(activeId))}
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

// {subcontainer.subsections.length > 0 &&
// 	subcontainer.subsections.
// 		.map((subsection, subsectionIndex) => (
// 		<>
// 			<SortableNodeWrapper
// 				id={`section-${subsection.id}`}
// 				key={`section-${subsection.id}`}
// 				dataID={`section-${subsection.id}`}
// 				index={index}
// 				isSubSection={true}
// 				style={getItemStyles}
// 				wrapperStyle={wrapperStyle}
// 				renderItem={renderItem}
// 				containerId={subcontainer.id}
// 				getIndex={() => getIndex(subsection.id)}
// 			/>
// 			{subsection.items.length > 0 && (
// 				<SortableContext
// 					items={subsection.items
// 						.sort((a, b) => a.list_order > b.list_order)
// 						.map((item) => item.id)}
// 					strategy={strategy}>
// 					<DroppableContainer
// 						id={subsection.id}
// 						items={subsection.items
// 							.sort((a, b) => a.list_order > b.list_order)
// 							.map((item) => item.id)}
// 						getStyle={iconContainerStyle}>
// 						{subsection.items
// 							.sort((a, b) => a.list_order > b.list_order)
// 							.map((item) => (
// 								<SortableNodeWrapper
// 									id={`item-${item.id}`}
// 									key={`item-${item.id}`}
// 									dataID={`item-${item.id}`}
// 									index={index}
// 									style={getItemStyles}
// 									wrapperStyle={wrapperStyle}
// 									renderItem={renderItem}
// 									containerId={subsection.id}
// 									getIndex={() => getIndex(item.id)}
// 								/>
// 							))}
// 					</DroppableContainer>
// 				</SortableContext>
// 			)}
// 		</>
// 	))}
