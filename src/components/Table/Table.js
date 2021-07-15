import React, { useEffect, useState } from 'react'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import styles from './Table.module.scss'
import Item from 'components/Table/components/Item/Item'
import { createPortal } from "react-dom";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableList } from "./components/SortableList/SortableList";
import { AddSectionButtoon } from './AddSection';


const Table = ({ data, isDirty, setDirty, addItem, addSection }) => {
	// const orderedData = orderTree(data)
	const [ menuData, setMenuData ] = useState(data)
	const [ activeID, setActiveID ] = useState(null)
	const [ dragOverlaidItems, setClonedItems ] = useState(null)
	let rootID

	useEffect(() => {
		if (data) setMenuData(data)
	}, [ data ])

	if (menuData) {
		rootID = menuData.id
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
			if (menuData.items.length > 0) {
				return rootID
			} else {
				return menuData?.subsections.find((section) => section.items.map(({ id }) => id)
					.includes(soughtID)).id
			}
		}
	}

	const getIndex = (soughtID, type) => {
		const container = findContainer(soughtID, type)

		if (!container) {
			return -1
		}

		if (type === "section") {
			return menuData.subsections.map(({ id }) => id).indexOf(soughtID);
		} else if (type === "item") {
			if (container === rootID) {
				return menuData.items.map(({ id }) => id).indexOf(soughtID)
			} else {
				const subsection = menuData.subsections.find(
					(subsection) => subsection.id === container
				)
				return subsection.items.map(({ id }) => id).indexOf(soughtID)
			}
		}
	};

	const handleDragStart = ({ active }) => {
		setActiveID(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = (props) => {
		const { active, over } = props

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

		if ((activeContainer === menuData.id) && (overContainer === menuData.id)) {
			if (activeType === 'item') {
				setMenuData((menuData) => {
					const overIndex = getIndex(over.id, overType)
					const activeIndex = getIndex(active.id, activeType)
					const { items } = menuData
					console.dir("Before: ", menuData)
					menuData.items = arrayMove(items, activeIndex, overIndex)
					console.dir("After: ", menuData)
					return menuData
				})
			} else if (activeType === 'section') {
				setMenuData((menuData) => {
					const overIndex = getIndex(over.id, overType)
					const activeIndex = getIndex(active.id, activeType)
					menuData.subsections = arrayMove(menuData.subsections, activeIndex, overIndex)
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
						items = arrayMove(items, activeIndex, overIndex)
						menuData.items = items
						return menuData
					})
				}
			} else {
				if (overContainer === undefined) return
				if (overType === 'section') return

				const overContainerIndex = getIndex(overContainer, 'section')
				const activeContainerIndex = getIndex(activeContainer, 'section')
				const overIndex = getIndex(over.id, overType)
				const activeIndex = getIndex(active.id, activeType)

				setMenuData((menuData) => {

					let newIndex

					const isBelowLastItem = over && (overIndex === menuData.subsections[ overContainerIndex ].items.length - 1) &&
						active.rect.current.translated.offsetTop > over.rect.offsetTop

					const modifier = isBelowLastItem ? 1 : 0

					newIndex = overIndex >= 0 ? overIndex + modifier :
						menuData.subsections[ overContainerIndex ].items.length + 1

					if (newIndex === 0) {
						menuData.subsections[ overContainerIndex ].items.unshift(menuData.subsections[ activeContainerIndex ].items[ activeIndex ])
					} else {
						menuData.subsections[ overContainerIndex ].items.splice(newIndex, 0, menuData.subsections[ activeContainerIndex ].items[ activeIndex ])
					}
					menuData.subsections[ activeContainerIndex ].items = menuData.subsections[ activeContainerIndex ].items.filter((item) => item.id !== active.id)
					return menuData
				})
			}
		}
	}

	const handleDragEnd = ({ active, over }) => {

		const overType = over.data.current.type
		const activeType = active.data.current.type

		const overContainerID = findContainer(over.id, overType)
		const activeContainerID = findContainer(active.id, activeType)
		// const overContainerIndex = getIndex(overContainerID, 'section')
		// const activeContainerIndex = getIndex(activeContainerID, 'section')
		//
		// const overIndex = getIndex(over.id, overType)
		// const activeIndex = getIndex(active.id, activeType)

		if (!overContainerID || !activeContainerID) {
			return
		}

		if (activeType !== overType) {
			return
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

	return (
		<>
			<DndContext
				onDragStart={ handleDragStart }
				onDragOver={ handleDragOver }
				onDragEnd={ handleDragEnd }
				onDragCancel={ handleDragCancel }
				sensors={ sensors }
				collisionDetection={ closestCorners }
				modifiers={ [ restrictToVerticalAxis ] }
			>
				<div className={ styles.Sections }>
					<SortableList menuData={ menuData } />}
				</div>
				{ createPortal(
					<DragOverlay wrapperElement={ "ul" } modifiers={ [ restrictToVerticalAxis ] } style={ { paddingLeft: 0 } }>
						{ activeID ?
							<Item
								dataID={ activeID }
								menuData={ menuData }
								dragOverlay
							/> : null }
					</DragOverlay>, document.body) }
			</DndContext>
			<AddSectionButtoon handleClick={ addSection } />
		</>
	)
}

export default Table
