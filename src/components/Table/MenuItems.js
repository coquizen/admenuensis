import React from 'react'
import styles from './MenuItem.module.scss'
import classnames from 'classnames'

const MenuItems = ({itemsData}) => {
    return (
        <>
            {itemsData.map((item, index) => <MenuCard key={item.id} data={item}/>)}
        </>
    )
}
export default MenuItems

const MenuCard = ({data}) => (
    <div className={styles.Card}>
        <div className={styles.CardHeader}>
            <h5 className={styles.CardTitle}>{data.title}</h5>
        </div>
        <div className={styles.CardBody}>
            <p className={styles.CardText}>{data.description ? data.description : "Description ..."}</p>
        </div>
        <div className={styles.CardFooter}>
            <div className={styles.Price}>{data.price/100}</div>
        </div>
    </div>
)