/** @format */
import React from 'react'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import SectionItem from '../menu/SectionItem'

const SortableItem = SortableElement(({ value }) => <li>{<SectionItem data={value} />}</li>)
const SortableList = SortableContainer(({ items }) => {
	return (
		<ul>
			{items.map((value, index) => (
				<SortableItem useDragHandle key={`item-${value.slug}`} index={index} value={value} />
			))}
		</ul>
	)
})

export default SortableList
