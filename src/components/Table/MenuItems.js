import React from 'react'
import styles from './MenuItem.module.scss'
import { faDotCircle, faEdit, faEllipsisH, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Item } from "../Form/forms"
import { useModal } from "../../context/ModalProvider"
import Form from 'components/Form'
import useFitText from 'hooks/useFitText'

const MenuItems = ({ itemsData }) => {
    return (
        <>
            {itemsData.map((item, index) => <MenuCard key={item.id} data={item} />)}
        </>
    )
}
export default MenuItems

const MenuCard = ({ data }) => {
    const { insertComponent } = useModal()
    const { fontSize, ref } = useFitText()

    const handleClick = (e) => {
        e.preventDefault()
        insertComponent(<Form form={<Item uuid={data.id} />} />)
    }
    return (
        <div className={styles.Card}>
            <div className={styles.CardHeader}>
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