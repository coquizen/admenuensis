import React, { useEffect, useState } from 'react'
import {
	closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import styles from './Table.module.scss'
import SortableItemWrapper from './SortableItemWrapper'
import DroppableContainer from './DroppableContainer'
import flattenTree from "utils/flattenTree";
import Item from 'components/DragAndDrop/Node/Item'
import { createPortal } from "react-dom";
import { useData } from 'context/DataProvider'

const defaultContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const Table = ({ getItemStyles = () => ({}), data }) => {
	const [ menuData, setMenuData] = useState(null)
	const [ activeNode, setActiveNode ] = useState()
	const [ dragOverlaidItems, setClonedItems ] = useState(null)
	const [ overIndex, setOverIndex ] = useState(null)
	const { getSectionDataByID, getItemDataByID } = useData()

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

		return menuData[ container ].list_order
	}

	const handleDragStart = ({ active }) => {
		let type
		if (getSectionDataByID(active.id)) {
			const section = getSectionDataByID(active.id)
			type = section.type
		} else {
			const item = getItemDataByID(active.id)
			type = item.type
		}
		setActiveNode({id: active.id, type})
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {
		const overId = over.id
		setOverIndex(overId)
		const overContainer = findContainer(overId)

		const activeContainer = findContainer(active.id)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeContainer !== overContainer) {
			setMenuData((menuData) => {
				const activeItemsID = menuData[ activeContainer ]
				const overItemsID = menuData[ overContainer ]
				const overIndex = menuData[ over.id ].list_order
				const activeIndex = menuData[ activeNode ].list_order

				let newIndex

				if (overId in menuData) {
					newIndex = overItemsID.length + 1
				} else {
					const isBelowLastItem =
						over &&
						overIndex === overItemsID.length - 1 &&
						draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

					const modifier = isBelowLastItem ? 1 : 0

					newIndex = overIndex >= 0 ? overIndex + modifier : overItemsID.length + 1
				}

				menuData[ over.id ].list_order = activeIndex
				menuData[ activeNode ].list_order = overIndex
				return menuData

				// return {
				// 	...menuData,
				// 	[ activeContainer ]: [ ...menuData[ activeContainer ].filter((itemID) => itemID !== active.id) ],
				// 	[ overContainer ]: [
				// 		...menuData[ overContainer ].slice(0, newIndex),
				// 		menuData[ activeContainer ][ activeIndex ],
				// 		...menuData[ overContainer ].slice(newIndex, items[ overContainer ].length),
				// 	],
				// }
			})
		}
	}

	const handleDragEnd = ({ active, over }) => {
		const activeContainer = findContainer(active.id)

		if (!activeContainer) {
			setActiveNode(null)
			return
		}

		const overId = over.id

		const overContainer = findContainer(overId)

		if (activeContainer && overContainer) {
			const activeIndex = menuData[ activeContainer ].list_order
			const overIndex = menuData[ overContainer ].list_order

			let tempMenu = menuData
			tempMenu[ activeContainer ].list_order = activeIndex
			tempMenu[ overContainer ].list_order = overIndex
			if (activeIndex !== overIndex) {
				// setMenuData((items) => ({
				// 	...menuData,
				// 	[ overContainer ]: arrayMove(menuData[ overContainer ], activeIndex, overIndex),
				// }))
				setMenuData(tempMenu)
			}
		}

		setActiveNode(null)
	}

	const handleDragCancel = () => {
		if (dragOverlaidItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			setMenuData(dragOverlaidItems)
		}

		setActiveNode(null)
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
					<DragAndDropContainer getIndex={getIndex} key={containerId} data={menuData[containerId]} containerId={containerId}/>)
				)}
			</div>
			{createPortal(
				<DragOverlay>
					{activeNode ?
					 <Item
						dataID={activeNode.id}
						type={activeNode.type}
						style={getItemStyles({
							containerId:   menuData?.id,
							overIndex:     -1,
							index:         getIndex(activeNode.id),
							width: overIndex !== 0 ? '80%' : '100%',
							transition:    'width 300ms',
							isSorting:     true,
							isDragging:    true,
							isDragOverlay: true
						})}
					index={getIndex(activeNode.id)}
					wrapperStyle={()=>({})}
					dragOverlay
				/> : null}
			</DragOverlay>, document.body)}
		</DndContext>
	)
}
const DragAndDropContainer = ({data, getIndex, containerId}) => {
	const itemIDs = []
	itemIDs.push(containerId)
	itemIDs.push(data.map(({id}) => id))
	return (
	<SortableContext items={itemIDs}>
		<DroppableContainer id={containerId} items={itemIDs} getStyle={() => ({})}>
			<section key={data.id}>
			{data.map((item, index) => (
				<article key={item.id}>
					<SortableItemWrapper
						dataID={item.id}
						type={item.type}
						index={index}
						style={()=>({})}
						wrapperStyle={() => ({})}
						containerId={containerId}
						getIndex={getIndex}/>
				</article>
			))}
			</section>
		</DroppableContainer>
	</SortableContext>)
}
export default Table