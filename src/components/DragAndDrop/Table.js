import React, { useEffect, useState } from 'react'
import {
	closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import styles from './Table.module.scss'
import SortableItemWrapper from './SortableItemWrapper'
import DroppableContainer from './DroppableContainer'
import flattenTree from "utils/flattenTree";
import Item from 'components/DragAndDrop/Node/Item'
import { createPortal } from "react-dom";

const getContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const Table = ({ getItemStyles = () => ({}), wrapperStyle = () => ({}), data }) => {
	const [ menuData, setMenuData] = useState(null)
	const [ activeID, setActiveID ] = useState()
	const [ dragOverlaidItems, setClonedItems ] = useState(null)


	useEffect(() => {
		if (data) {
			let parsedMenu = flattenTree(data)
			setMenuData(parsedMenu)
		}
	},[data])

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

		return Object.keys(menuData).find((key) => menuData[ key ].includes(id))
	}

	const getIndex = (id) => {
		const container = findContainer(id)

		if (!container) {
			return -1
		}

		if (id === container) {
			return 0
		}
		return menuData[ container ].indexOf(id)
	}

	const handleDragStart = ({ active }) => {
		setActiveID(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {

		const overContainer = findContainer(over.id)

		const activeContainer = findContainer(active.id)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeContainer !== overContainer) {
			setMenuData((menuData) => {
				const activeItemsID = menuData[ activeContainer ]
				const overItemsID = menuData[ overContainer ]
				const overIndex = overItemsID.indexOf(over.id)
				const activeIndex = activeItemsID.indexOf(active.id)
				let newIndex

				if (over.id in menuData) {
					newIndex = overItemsID.length + 1
				} else {
					const isBelowLastItem =
							  over &&
							  overIndex === overItemsID.length - 1 &&
							  draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

					const modifier = isBelowLastItem ? 1 : 0

					newIndex = overIndex >= 0 ? overIndex + modifier : overItemsID.length + 1
				}

				return {
					...menuData,
					[ activeContainer ]: [ ...menuData[ activeContainer ].filter((item) => item !== active.id) ],
					[ overContainer ]: [
						...menuData[ overContainer ].slice(0, newIndex),
						menuData[ activeContainer ][ activeIndex ],
						...menuData[ overContainer ].slice(newIndex, menuData[ overContainer ].length),
					],
				}
			})
		}
	}

	const handleDragEnd = ({ active, over }) => {
		const activeContainer = findContainer(active.id)

		if (!activeContainer) {
			setActiveID(null)
			return
		}


		const overContainer = findContainer(over.id)

		if (activeContainer && overContainer) {
			const activeIndex = menuData[ activeContainer ].indexOf(active.id)
			const overIndex = menuData[ overContainer ].indexOf(over.id)

			if (activeIndex !== overIndex) {
				setMenuData((menuData) => ({
					...menuData,
					[ overContainer ]: arrayMove(menuData[ overContainer ], activeIndex, overIndex),
					}))

			}
		}

		setActiveID(null)
	}

	const handleDragCancel = () => {
		if (dragOverlaidItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			setMenuData(dragOverlaidItems)
		}

		setActiveID(null)
		setClonedItems(null)
	}

	console.info(menuData)
	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
			sensors={sensors}
			collisionDetection={closestCorners}
		>
			<div className={styles.Sections}>
				{menuData && Object.keys(menuData).map((containerId) =>	(
					<SortableContext items={menuData[containerId]} strategy={verticalListSortingStrategy}>
						<DroppableContainer id={containerId} items={menuData[containerId]} getStyle={getContainerStyle}>
							<section key={containerId}>
								{menuData[containerId].map((nodeID, index) => (
									<SortableItemWrapper
										id={nodeID}
										key={nodeID}
										dataID={nodeID}
										index={index}
										style={getItemStyles}
										wrapperStyle={wrapperStyle}
										containerId={containerId}
										getIndex={getIndex}/>
								))}
							</section>
						</DroppableContainer>
					</SortableContext>)
				)}
			</div>
			{createPortal(
				<DragOverlay adjustScale='false'>
					{activeID ?
					 <Item
						dataID={activeID}
						style={getItemStyles({
							containerId:   findContainer(activeID),
							overIndex:     -1,
							index:         getIndex(activeID),
							isSorting:     activeID !== null,
							isDragging:    true,
							isDragOverlay: true
						})}
					index={getIndex(activeID)}
					wrapperStyle={wrapperStyle({index: 0})}
					dragOverlay
				/> : null}
			</DragOverlay>, document.body)}
		</DndContext>
	)
}
const DragAndDropContainer = ({nodeIDs, getIndex, containerId, getItemStyles, wrapperStyle}) => {

	return (
	<SortableContext items={nodeIDs}>
		<DroppableContainer id={containerId} items={nodeIDs} getStyle={getContainerStyle}>
			<section key={containerId}>
			{nodeIDs.map((nodeID, index) => (
					<SortableItemWrapper
						id={nodeID}
						key={nodeID}
						dataID={nodeID}
						index={index}
						style={getItemStyles}
						wrapperStyle={wrapperStyle}
						containerId={containerId}
						getIndex={getIndex}/>
			))}
			</section>
		</DroppableContainer>
	</SortableContext>)
}
export default Table