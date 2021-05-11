import React from 'react'
import styles from './MenuSection.module.scss'
import MenuItems from './ItemCard'
import {useSortable} from '@dnd-kit/sortable'
import classnames from 'classnames'
import Handle from "./Handle";

const MenuSection = ({sectionData}) => {
    const {id, title, description, items } = sectionData
    const { attributes, listeners} = useSortable({id})
    return (
    <div className={styles.Section}>

        <h5 className={styles.SectionTitle}>
            {title}
        </h5>
        <div className={styles.SectionDescription}>{description ? description : "Description..."}</div>
        {items && <div className={styles.CardGroup}><MenuItems itemsData={items} /></div>}
    </div>
    )
}
export default MenuSection
