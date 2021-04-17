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
import styles from './Table.module.scss'
import {default as flattenMenu} from 'utils/flattenTree'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List, SortableNodeWrapper, Node } from 'components/Table'
import MiniSectionForm from 'components/Table/Node/MiniSectionForm'
import MiniItemForm from 'components/Table/Node/MiniItemForm'
import { useData } from 'context/DataProvider'

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

// const iconContainerStyle = ({ isOverContainer }) => ({
// 	marginTop: '-1rem',
// 	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
// })

const VOID_ID = 'void'

const Table = ({
	collisionDetection = closestCorners,
	getItemStyles = () => ({}),
	getContainerStyle = defaultContainerStyle,
	wrapperStyle = () => ({}),
	modifiers,
	renderItem,
	strategy = verticalListSortingStrategy,
}) => {
	const { menus, allData, getSectionDataByID, getItemDataByID } = useData()
	const [ isBefore, setIsBefore ] = useState(false)
	const [ menuData, setMenuData ] = useState()
	const [ dragOverlaydItems, setClonedItems ] = useState(null)
	const [ activeId, setActiveId ] = useState(null)
	const [ overIndex, setOverIndex ] = useState(null)

	useEffect(() => {
		let flattened = []
		menus.forEach((menu) => flattened.push(flattenMenu(menu)))
		setMenuData(flattened)
	}, [ menus ])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const findContainer = (id) => {
		const menuComponent = allData.section.find(({ secID }) => id === secID) || allData.item.find(({ itemID }) => id === itemID)
		return (menuComponent.section_id === undefined ? id : menuComponent.section_id)

	}

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

	console.table(menuData)

	return (
		<>
			<List>
				<MiniSectionForm isBlank={true} />
				<MiniItemForm isBlank={true} />
			</List>
			<DndContext
				sensors={sensors}
				collisionDetection={collisionDetection}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				modifiers={modifiers}>
				<div className={styles.Table}>
					{menus && <SortableContext
						id='root'
						items={menus.map((menu) => menu).sort((a, b) => a.list_order < b.list_order).map(({ id }) => id)}
						strategy={strategy}>
						<DroppableContainer
							items={menus.map((menu) => menu).sort((a, b) => a.list_order < b.list_order).map(({ id }) => id)}
							getStyle={getContainerStyle}
						>{menus.sort((a, b) => a.list_order > b.list_order).map((menu, index) => (
							<div key={menu.id}>
								<SortableNodeWrapper
									id={menu.id}
									key={menu.id}
									dataID={menu.id}
									index={index}
									style={getItemStyles}
									wrapperStyle={wrapperStyle}
									renderItem={renderItem}
									getIndex={() => getIndex(menu.id)}
								/>
								{menu.subsections !== undefined && (
									<SortableContext id={menu.id} items={menu.subsections.map(({ id }) => id)} strategy={strategy}>
										<DroppableContainer items={menu.subsections.map(({ id }) => id)}>
											<>
												{menu.subsections.map((subsection, subIndex) => (
													<div key={subsection.id}>
														<SortableNodeWrapper
															id={subsection.id}
															dataID={subsection.id}
															index={subIndex}
															style={getItemStyles}
															wrapperStyle={wrapperStyle}
															renderItem={renderItem}
															getIndex={() => getIndex(subsection.id)}
														/>
														{subsection.items !== undefined && (
															<SortableContext id={subsection.items[ 0 ].id} items={subsection.items.map(({ id }) => id)} strategyy={strategy}>
																<DroppableContainer items={subsection.items.map(({ id }) => id)}>
																	{subsection.items.map((item, itemindex) => (
																		<SortableNodeWrapper
																			id={item.id}
																			key={item.id}
																			dataID={item.id}
																			index={itemindex}
																			style={getItemStyles}
																			wrapperStyle={wrapperStyle}
																			renderItem={renderItem}
																			getIndex={() => getIndex(item.id)}
																		/>
																	))}
																</DroppableContainer>
															</SortableContext>
														)}
													</div>)
												)}
											</>	</DroppableContainer>
									</SortableContext>
								)}
								{menu.items !== undefined &&
									<SortableContext id={menu.id} items={menu.items.map(({ id }) => id)} strategy={strategy}>
										<DroppableContainer items={menu.items.map(({ id }) => id)}>
											{menu.items.map((item, itemindex) => (
												<SortableNodeWrapper
													id={item.id}
													key={item.id}
													dataID={item.id}
													index={itemindex}
													style={getItemStyles}
													wrapperStyle={wrapperStyle}
													renderItem={renderItem}
													getIndex={() => getIndex(item.id)}
												/>
											)
											)}
										</DroppableContainer>
									</SortableContext>
								}
							</div>
						))
							}
						</DroppableContainer>
					</SortableContext>}
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
		</>
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