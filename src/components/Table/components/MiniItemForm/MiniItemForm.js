/** @format */

import React, { useState, memo} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign, faDotCircle, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import Handle from "components/Table/Handle"
import { useData } from "context/DataProvider"
import { useModal } from "context/ModalProvider"
import { Item } from "components/Form/forms"
import Form from "components/Form"
import styles from "./MiniItemForm.module.scss"
import classnames from "classnames";

const MiniItemForm = memo(({ uuid, listeners, attributes }) => {
	const { updateItem, fetchItem } = useData()
	const [ itemData, setItemData ] = useState(fetchItem(uuid))
	const [ isChanged, setIsChanged ] = useState(false)
	const { insertComponent } = useModal()

	const onChange = (event) => {
		const newItemData = itemData
		newItemData[ event.target.name ] = event.target.value
		setItemData(newItemData)
		if (!isChanged) {
			setIsChanged(true)
		}
	}

	// TODO: Check to see if React has trouble with this nested russian doll of a render
	const handleClick = (event) => {
		event.preventDefault()
		insertComponent(<Form label={"Item: " + itemData.title} form={<Item data={itemData} />} />)
	}

	const handleDataChange = (event) => {
		if (event.charCode === 13 && isChanged) {
			updateItem({ id: uuid, title: itemData.title, price: itemData.price * 100 })
			setIsChanged(false)
		}
	}

	const onLostFocus = (event) => {
		if (event.currentTarget === event.target && isChanged) {
			if (uuid !== "blank-item") {
				updateItem({id: uuid, title: itemData.title, price: itemData.price * 100})
				setIsChanged(false)
			} else {

			}
		}
	}

	const price = itemData.price ? (itemData.price / 100).toFixed(2) : "USD"

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
						<div className={styles.DollarSign}>
							<FontAwesomeIcon icon={faDollarSign} fixedWidth />
						</div>
						<div style={{ textAlign: "right" }}>
							<input
								name="price"
								className={styles.PriceInput}
								placeholder="USD"
								type="text"
								pattern="/[0-9]{0,3}.[0-9]{2}/"
								value={price}
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
})

export default MiniItemForm
