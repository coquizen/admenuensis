import React from 'react'
import styles from './MenuSection.module.scss'
import MenuItems from './MenuItems'
import classnames from 'classnames'

const MenuSection = ({sectionData}) => {
    const {id, title, description, items } = sectionData
    return (
    <div className={styles.Section}>
        <h5 className={styles.SectionTitle}>{title}</h5>
        <div className={styles.SectionDescription}>{description ? description : "Description..."}</div>
        {items && <div className={styles.CardGroup}><MenuItems itemsData={items} /></div>}
    </div>
    )
}
export default MenuSection
