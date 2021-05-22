import React, { useEffect, useState } from 'react'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import styles from './Table.module.scss'
import SortableItemWrapper from './SortableItemWrapper'
import DroppableContainer from './DroppableContainer'
import { orderTree, flattenTree } from "utils/flattenTree";
import Item from 'components/DragAndDrop/Node/Item'
import { createPortal } from "react-dom";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useData } from 'context/DataProvider'
import SortableContainer from './SortableContainer'
import { fetchMenus } from 'services/data'
const getContainerStyle = ({ isOverContainer }) => ({
	marginTop: 40,
	backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

const Table = ({  }) => {
	let data = []
	let dat = fetchMenus()
	const orderedData = orderTree(data)
	const { sectionsArray } = flattenTree(data)
	const [ menuData, setMenuData ] = useState(dat[0])
	const [ sectionsOrder, setSectionsOrder ] = useState(sectionsArray)
	const [ activeID, setActiveID ] = useState(null)
	const [ dragOverlaidItems, setClonedItems ] = useState(null)
	const { updateSection } = useData()

	// useEffect(() => {
	// 	const { sectionsArray, newTree } = flattenTree(data)
	// 	setMenuData(newTree)
	// 	setSectionsOrder(sectionsArray)
	// }, [ data ])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const findContainer = (id) => {
		if (id in menuData) {
			return data.id
		}

		return Object.keys(menuData).find((key) => menuData[ key ].includes(id))
	}

	const getIndex = (id) => {
		const container = findContainer(id)

		if (!container) {
			return -1
		}

		if (container === data.id) {
			return sectionsOrder.findIndex((item) => item.id === id)
		}
		return menuData[ container ].indexOf(id)
	}

	const handleDragStart = ({ active }) => {
		setActiveID(active.id)
		setClonedItems(menuData)
	}

	const handleDragOver = ({ active, over, draggingRect }) => {
		const overType = over.data.current.type
		const activeType = active.data.current.type
		const overContainer = findContainer(over.id)

		const activeContainer = findContainer(active.id)

		if (!overContainer || !activeContainer) {
			return
		}

		if (activeType !== overType) {
			return
		}
		if (overContainer === activeContainer === data.id) {
			setSectionsOrder((sections) => {
				const overIndex = getIndex(over.id)
				const activeIndex = getIndex(active.id)
				const swappedArray = arrayMove(sections, activeIndex, overIndex)
				return swappedArray
			})
		} else if (activeContainer !== overContainer) {
			setMenuData((menuData) => {
				const activeItemsID = menuData[ activeContainer ]
				const overItemsID = menuData[ overContainer ]
				const overIndex = getIndex(over.id)
				const activeIndex = getIndex(active.id)
				let newIndex

				if (overItemsID === undefined) return
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

		if (activeContainer === data.id) {
			const activeIndex = sectionsOrder.map(({ id }) => id).indexOf(active.id)
			const overIndex = sectionsOrder.map(({ id }) => id).indexOf(over.id)

			setSectionsOrder((sectionsOrder) => {

				return [ sectionsOrder[ activeIndex ], sectionsOrder[ overIndex ] ] = [ sectionsOrder[ overIndex ], sectionsOrder[ activeIndex ] ]

			})
			return
		}
		if (activeContainer && overContainer) {
			const activeIndex = getIndex(active.id)
			const overIndex = getIndex(over.id)

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

	console.info('table: ', menuData)
	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
			sensors={sensors}
			collisionDetection={closestCenter}
			modifiers={[ restrictToVerticalAxis ]}
		>
			<div className={styles.Sections}>

				<SortableContext id='root' items={menuData.subsections.map(({id}) => id)}>
					{menuData.subsections.map((subsection) => {
						return <SortableContainer menuData={menuData} key={subsection.id} id={subsection.id} items={subsection.items} />})}
				</SortableContext>
			</div>
			{createPortal(
				<DragOverlay modifiers={[ restrictToVerticalAxis ]}>
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

const DnDSection = ({ menuData, sectionsOrder, rootID }) => {
	if (sectionsOrder === undefined) <></>
	const sectionsID = sectionsOrder?.map(({ id }) => id)
	return (
		<SortableContext items={sectionsID} strategy={verticalListSortingStrategy} id={rootID}>
			<DroppableContainer items={sectionsID} id={rootID}>
				{sectionsOrder && sectionsOrder.map((section) => (
					<div key={section.id}>
						<SortableItemWrapper id={section.id} dataID={section.id} menuData={menuData} key={section.id} formType={'section'} />
						<SortableContext items={menuData[ section.id ]} strategy={verticalListSortingStrategy}>
							<DroppableContainer id={section.id} items={menuData[ section.id ]} getStyle={getContainerStyle}>
								{menuData[ section.id ].map((nodeID, index) => (
									<SortableItemWrapper
										id={nodeID}
										key={nodeID}
										dataID={nodeID}
										index={index}
										menuData={menuData}
										formType={'item'}
									/>
								))}
							</DroppableContainer>
						</SortableContext>
					</div>
				))}
			</DroppableContainer>
		</SortableContext>
	)
}
const DragAndDropContainer = ({ nodeIDs, getIndex, containerId, getItemStyles, wrapperStyle }) => {

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
							getIndex={getIndex} />
					))}
				</section>
			</DroppableContainer>
		</SortableContext>)
}
export default Table
