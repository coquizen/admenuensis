/** @format */

import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDotCircle, faEdit, faEllipsisH, faDollarSign } from "@fortawesome/free-solid-svg-icons"
import classnames from "classnames"
import Handle from "components/DragAndDrop/Handle"
import { useData } from "context/DataProvider"
import { useModal } from "context/ModalProvider"
import { Item } from "components/Form/forms"
import Form from "components/Form"
import styles from "./MiniItemForm.module.scss"

const defaults = { title: "", price: null, section_id: 1 }

const MiniItemForm = ({ uuid, listeners, attributes, isBlank = false }) => {
	const { updateItem, getItemDataByID } = useData()
	let data
	switch (isBlank) {
		case true:
			data = defaults
			break;
		case false:
			data = getItemDataByID(uuid)
			break;
		default:
			console.error("How did you even get here?!")

	}

	const [ itemData, setItemData ] = useState()
	const [ isChanged, setIsChanged ] = useState(false)
	const { insertComponent } = useModal()

	useEffect(() => {
		if (data) {
			setItemData(data)
		}
	},[data])
	const onChange = (e) => {
		const newItemData = itemData
		newItemData[ e.target.name ] = e.target.value
		setItemData(newItemData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	if (typeof itemData === undefined) debugger
	const handleClick = (e) => {
		e.preventDefault()
		insertComponent(<Form form={<Item uuid={uuid} />} />)
	}


	const handleDataChange = (e) => {
		if (e.charCode === 13 && isChanged) {
			updateItem({ id: uuid, title: itemData.title, price: itemData.price * 100 })
			setIsChanged(false)
		}
	}

	const onLostFocus = (e) => {
		if (e.currentTarget === e.target && isChanged) {
			updateItem({ id: uuid, title: itemData.title, price: itemData.price * 100 })
			setIsChanged(false)
		}
	}

	return (
		<>
		{itemData && <div className={styles.NodeWrapper}>
			<div className={styles.Node}>
				{!isBlank && <Handle listeners={listeners} attributes={attributes} />}
				<input
					name="title"
					type="text"
					className={classnames(styles.NodeInput, isBlank && styles.NodeNew)}
					value={itemData.title}
					onChange={onChange}
					onKeyPress={handleDataChange}
					onBlur={onLostFocus}
					placeholder="Please type in a food item. E.g. French Fries"
					disabled={isBlank}
				/>
				<div type="button" className="btn btn-sm">
					<FontAwesomeIcon icon={faDollarSign} fixedWidth />
				</div>
				<div style={{ textAlign: "right" }}>
					<input
						name="price"
						className={styles.PriceInput}
						placeholder="USD"
						type="text"
						pattern="/[0-9]{0,3}.[0-9]{2}/"
						value={(itemData.price ? (itemData.price / 100).toFixed(2) : "USD")}
						onChange={onChange}
						onKeyPress={handleDataChange}
						onBlur={onLostFocus}
					/>
				</div>
				<div className={styles.ButtonGroup}>
					<button type="button" className="btn btn-sm">
						<FontAwesomeIcon icon={faDotCircle} fixedWidth />
					</button>
					<button type="button" className="btn btn-sm" onClick={handleClick}>
						<FontAwesomeIcon icon={faEdit} fixedWidth />
					</button>
					<button type="button" className="btn btn-sm">
						<FontAwesomeIcon icon={faEllipsisH} fixedWidth />
					</button>
				</div>

			</div>
		</div>}
	</>
	)
}

export default MiniItemForm
