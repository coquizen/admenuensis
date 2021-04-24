import React, { useState, useEffect } from 'react'
import { DndContext, DragOverlay, closestCorners, useSensors, useSensor, PointerSensor, KeyboardSensor, useDroppable } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useData } from 'context/DataProvider'
import List from 'components/Table/List'
import styles from './Table.module.scss'
import { SortableNodeWrapper } from 'components/Table/Node'
import Menus from './Menus'
import SortableWrapper from './SortableWrapper'
import DroppableContainer from './DroppableContainer'
import flattenTree from "../../utils/flattenTree";

const defaultContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const Table = ({ getItemStyles = () => ({}) }) => {
	const { menus } = useData()
	const [ menuData, setMenuData ] = useState(null)
	const [ activeId, setActiveId ] = useState(null)
	const [ dragOverlaydItems, setClonedItems ] = useState(null)
	const [ overIndex, setOverIndex ] = useState(null)
	const [ queue, setQueue ] = useState([])

	useEffect(() => {
		if (menus) {
			let menuObj = {}
			menus.forEach((menu) => menuObj[menu.id] = flattenTree(menu))
			setMenuData(menuObj)
		}
	}, [ menus ])


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

		const index = menuData[ container ].list_order

		return index
	}

	const handleDragStart = ({ active }) => {
		setActiveId(active.id)
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
				const activeIndex = menuData[ activeId ].list_order

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

				setQueue(
					queue.concat({
						oldParent: activeContainer,
						newParent: overContainer,
						oldIndex: activeIndex,
						newIndex: overIndex,
					})
				)

				menuData[ over.id ].list_order = activeIndex
				menuData[ activeId ].list_order = overIndex
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
			setActiveId(null)
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

		setActiveId(null)
	}

	const handleDragCancel = () => {
		if (dragOverlaydItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			setMenuData(dragOverlaydItems)
		}

		setActiveId(null)
		setClonedItems(null)
	}

	let menuItems
	if (menuData) menuItems = Object.keys(menuData).sort((a, b) => {
		return menuData[a].list_order - menuData[b].list_order
	}).map((containerID => containerID))
	return (
		<>
			{menuData && menuItems.map((menuID) => <Menus key={menuID} menusData={menuData[menuID]}  />)}</>

	)
}

export default Table