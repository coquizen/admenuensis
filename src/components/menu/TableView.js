/** @format */
import React, { useState, useEffect } from 'react'
import SortableList from 'components/layout/SortableList'
import arrayMove from 'array-move'

const TableView = () => {
	const [data, setData] = useState()

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setData(arrayMove(data, oldIndex, newIndex))
	}

	useEffect(() => {
		fetch('/sections')
			.then((response) => response.json())
			.then((newData) => setData(newData.data))
	}, [])

	return (
		<div className='table-view'>
			<div className='__header'>Details</div>
			<div className='__body'>
				<div className='tree'>{data && <SortableList items={data} onSortEnd={onSortEnd} />}</div>
			</div>
		</div>
	)
}
export default TableView
