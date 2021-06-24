import React, { useEffect, useState } from 'react'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	rectIntersection,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import styles from './Table.module.scss'
import Item from 'components/Table/sortables/Item'
import { createPortal } from "react-dom";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableContainer from 'components/Table/sortables/SortableContainer'

const getContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const customCollisionDetectionStrategy = (rects, rect) => {
	const rootRect = rects.filter(([id]) => id === 'root')
	const intersectingRootRect = rectIntersection(rootRect, rect)

	if (intersectingRootRect) {
		return intersectingRootRect
	}

	const otherRects = rects.filter(([id]) => id !== 'root')
	return closestCorners(otherRects, rect)
}

const Table = ({ data }) => {
	// const orderedData = orderTree(data)
	const [ menuData, setMenuData ] = useState(null)
	const [ activeID, setActiveID ] = useState(null)
	const [ dragOverlaidItems, setClonedItems ] = useState(null)
	let rootID

	useEffect(() => {
		if (data) setMenuData(data)
	}, [ data ])

	if (menuData) {
		rootID = menuData[ "id" ]
	}

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const findContainer = (soughtID, type) => {
		if (soughtID === rootID) {
			return rootID
		}
		if (type === 'section') {
			return rootID
		} else if (type === 'item') {
			return menuData?.subsections.find((section) => section.items.map(({ id }) => id)
				.includes(soughtID)).id || rootID
		}
	}
	const getIndex = (soughID, type) => {
		const container = findContainer(soughID, type)

		if (!container) {
			return -1
		}

		if (type === "section") {

			return menuData.subsections.map(({ id }) => id).indexOf(soughID);
		} else if (type === "item") {
			if (container === rootID) {
				return menuData.items.map(({ id }) => id).indexOf(soughID)
			} else {
				const subsection = menuData.subsections.find(
					(subsection) => subsection.id === container
				)
				return subsection.items.map(({ id }) => id).indexOf(soughID)
			}
		}
	};


	const handleDragStart = ({ active }) => {
		setActiveID(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {
		if (!over || !active) return
		const overType = over.data.current?.type
		const activeType = active.data.current.type

		const overContainer = findContainer(over.id, overType)
		const activeContainer = findContainer(active.id, activeType)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeType !== overType) {
			return
		}
		if (overContainer === activeContainer === menuData[ "id" ]) {
			if (activeType === 'item') {
				setMenuData((menuData) => {
					const overIndex = getIndex(over.id, overType)
					const activeIndex = getIndex(active.id, activeType)
					const { items } = menuData
					menuData.items = arrayMove(items, activeIndex, overIndex)
					return menuData
				})

			} else {
				setMenuData((menuData) => {
					const overIndex = getIndex(over.id, overType)
					const activeIndex = getIndex(active.id, activeType)
					const { subsections } = menuData
					menuData.subsections = arrayMove(subsections, activeIndex, overIndex)
					return menuData
				})
			}
			return
		}

		if (activeType === 'item') {
			if (overContainer === activeContainer) {
				if (overContainer !== rootID) {
					setMenuData((menuData) => {
						const containerIndex = getIndex(overContainer, 'section')
						const overIndex = getIndex(over.id, overType)
						const activeIndex = getIndex(active.id, activeType)
						const items = menuData.subsections.find((section) => section.id === overContainer).items
						menuData.subsections[ containerIndex ].items = arrayMove(items, activeIndex, overIndex)
						return menuData
					})
				} else {
					setMenuData((menuData) => {
						const overIndex = getIndex(over.id, overType)
						const activeIndex = getIndex(active.id, activeType)
						let { items } = menuData
						console.info("items: ", items)
						items = arrayMove(items, activeIndex, overIndex)
						console.info("items: ", items)
						menuData.items = items
						return menuData
					})
				}
			} else {
				setMenuData((menuData) => {
					const overContainerIndex = getIndex(overContainer, 'section')
					const activeContainerIndex = getIndex(activeContainer, 'section')
					const overIndex = getIndex(over.id, overType)
					const activeIndex = getIndex(active.id, activeType)

					let newIndex

					const isBelowLastItem = over &&
						overIndex === menuData.subsections[ overContainerIndex ].items.length - 1 &&
						draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

					const modifier = isBelowLastItem ? 1 : 0

					newIndex = overIndex >= 0 ? overIndex + modifier :
						menuData.subsections[ overContainerIndex ].items.length + 1

					menuData.subsections[ overContainerIndex ].items = [ menuData.subsections[ overContainerIndex ].items.slice(0, newIndex),
					menuData.subsections[ activeContainerIndex ].items[ activeIndex ],
					...menuData.subsections[ overContainerIndex ].items.slice(newIndex, menuData.subsections[ overContainerIndex ].items.length - 1) ]
					menuData.subsections[ activeContainerIndex ].items = menuData.subsections[ activeContainerIndex ].items.filter((item) => item !== active.id)
					return menuData
				})
			}
		}
	}

	const handleDragEnd = ({ active, over }) => {

		const overType = over.data.current.type
		const activeType = active.data.current.type

		const overContainer = findContainer(over.id, overType)
		const activeContainer = findContainer(active.id, activeType)

		const overIndex = getIndex(over.id, overType)
		const activeIndex = getIndex(active.id, activeType)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeType !== overType) {
			return
		}
		if (overContainer === activeContainer === menuData[ "id" ]) {
			if (activeType === 'item') {
				const containerIndex = getIndex(overContainer, 'section')
				setMenuData((menuData) => {
					const items = menuData.subsections.find((section) => section.id === overContainer).items
					menuData.subsections[ containerIndex ].items = arrayMove(items, activeIndex, overIndex)
					return menuData
				})
			} else {
				setMenuData((menuData) => {
					let { subsections } = menuData
					menuData.subsections = arrayMove(subsections, activeIndex, overIndex)
					return menuData
				})
			}
			setActiveID(null)
		}
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

	console.info('menu: ', menuData)

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
			sensors={sensors}
			collisionDetection={customCollisionDetectionStrategy}
			modifiers={[ restrictToVerticalAxis ]}
		>
			<div className={styles.Sections}>
				{menuData && <SortableLists menuData={menuData} />}
			</div>
			{createPortal(
				<DragOverlay wrapperElement={"ul"} modifiers={[ restrictToVerticalAxis ]} style={{paddingLeft: 0}}>
					{activeID ?
						<Item
							dataID={activeID}
							menuData={menuData}
							dragOverlay={true}
						/> : null}
				</DragOverlay>, document.body)}
		</DndContext>
	)
}

const SortableLists = ({ menuData }) => {
	if (menuData.subsections?.length > 0) {
		const sectionIDs = menuData.subsections.map(({ id }) => id)
		return (
			<SortableContext id='root' items={sectionIDs} strategy={verticalListSortingStrategy}>
				<SortableContainer menuData={menuData} id={menuData.id} nodes={menuData.subsections} isSubSection={true} />
			</SortableContext>
		)
	} else if (menuData.items?.length > 0) {
		let filteredItems = menuData.items.filter((item) => item.type === 'Plate')

		filteredItems.sort((a, b) => a.list_order - b.list_order)

		const filteredItemIDs = filteredItems.map(({id}) => id)

		if (filteredItems.length > 0) {
			return (
				<SortableContext id='root' items={filteredItemIDs} strategy={verticalListSortingStrategy}>
					<SortableContainer menuData={menuData} id={menuData.id} nodes={menuData.items} isSubSection={false} />
				</SortableContext>
			)
		}
	}
	return null
}

export default Table
