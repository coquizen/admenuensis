/** @format */

import React from 'react'
import { Handle } from 'components/Table/Handle'
import { useData } from 'context/DataProvider'
import { useModal } from 'context/ModalProvider'

const MiniItemForm = ({ data, listeners, attributes }) => {
	const { updateItemByID } = useData()
	const { id, title } = data
	const [itemTitle, setItemTitle] = useState(title)
	const [isChanged, setIsChanged] = useState(false)
	const { insertComponent } = useModal()

	const onChange = () => {}
	return (
		<div className='node'>
			<Handle listeners={listeners} attributes={attributes} />
			<input className='node-input' type='text' value={value} onChange={onChange} />
			<button type='button' className='price-button'>
				{price ? price : 'USD'}
			</button>
			<div className='btn-group btn-group-sm ms-auto' role='group'>
				<button type='button' className='btn'>
					<i className='fas fa-plus fw'></i>
				</button>
				<button type='button' className='btn invisible'>
					<i className='fas fa-edit fw'></i>
				</button>
				<button type='button' className='btn invisible'>
					<i className='fas fa-ellipsis-h fw'></i>
				</button>
			</div>
		</div>
	)
}

export default MiniItemForm
