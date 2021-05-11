import React from 'react'
import styles from './Node/Item.module.scss'
import { faDotCircle, faEdit, faEllipsisH, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Item } from "../Form/forms"
import { useModal } from "context/ModalProvider"
import { useData } from "context/DataProvider"
import Form from 'components/Form'
import Handle from 'components/DragAndDrop/Handle'
import useFitText from 'hooks/useFitText'

const ItemCard = ({ dataID, listeners, attributes }) => {
    const { getItemDataByID } = useData()
    const { insertComponent } = useModal()
    const { fontSize, ref } = useFitText()

    const data = getItemDataByID(dataID)
    const handleClick = (e) => {
        e.preventDefault()
        insertComponent(<Form form={<Item uuid={data.id} />} />)
    }
    return (
        <div className={styles.Card}>
            <div className={styles.CardHeader}>
                <Handle listeners={listeners} attributes={attributes} />
                <div ref={ref} style={{ fontSize, color: 'black' }}>
                    {data.title}
                </div>
            </div>

            <div className={styles.CardBody}>
                <p className={styles.CardText}>{data.description ? data.description : "Description ..."}</p>
            </div>
            <div className={styles.CardFooter}>
                <div className={styles.EditButton}>
                    <button type='button' className='btn btn-sm' onClick={handleClick}>
                        <FontAwesomeIcon icon={faEdit} fixedWidth />
                    </button>
                </div>
                <div className={styles.Price}>{data.price / 100}</div>
            </div>
        </div>
    )
}
export default ItemCard