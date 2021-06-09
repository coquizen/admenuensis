/** @format */

import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDollarSign, faDotCircle, faEdit, faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import Handle from "components/Table/Handle"
import {useData} from "context/DataProvider"
import {useModal} from "context/ModalProvider"
import {Item} from "components/Form/forms"
import Form from "components/Form"
import styles from "./MiniItemForm.module.scss"
import {fetchItem} from 'services/data'
import classnames from "classnames";

const MiniItemForm = ({uuid, listeners, attributes}) => {
	const {updateItem} = useData()

	const [itemData, setItemData] = useState(null)
	const [isChanged, setIsChanged] = useState(false)
	const {insertComponent} = useModal()

	useEffect(() => {
		setTimeout(() => {
		const fetchData = (uuid) => {
			fetchItem(uuid).then(setItemData)
		}
		fetchData(uuid)}, 1000)
	}, [uuid])

	const onChange = (e) => {
		const newItemData = itemData
		newItemData[ e.target.name ] = e.target.value
		setItemData(newItemData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	// TODO: Check to see if React has trouble with this nested russian doll of a render
	const handleClick = (e) => {
		e.preventDefault()
		insertComponent(<Form label={"Item: " + itemData.title} form={<Item data={itemData}/>}/>)
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
		{itemData !== null ?
		<div className={styles.NodeWrapper}>
			<div className={styles.Node}>
				<Handle listeners={listeners} attributes={attributes} />
				<input
					name="title"
					type="text"
					className={styles.NodeInput}
					value={itemData.title}
					onChange={onChange}
					onKeyPress={handleDataChange}
					onBlur={onLostFocus}
					placeholder="Please type in a food item. E.g. French Fries"

				/>
				<button type="button" className="btn btn-sm">
					<FontAwesomeIcon icon={faDollarSign} fixedWidth />
				</button>
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
		</div> : <div className={classnames(styles.Gradient, styles.Blank)}>
				<input
					type='text'
					className={classnames(styles.Blank)}
					disabled='true'
				/>
				<div className={classnames(styles.Blank, styles.Gradient)} />
			</div>}
	</>
	)
}

export default React.memo(MiniItemForm)
