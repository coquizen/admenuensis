import React from 'react'
import Handle from './Handle'
import {rectSwappingStrategy, SortableContext, useSortable} from '@dnd-kit/sortable'
import styles from './Menus.module.scss'
import SortableWrapper from "./SortableWrapper";
import MenuSection from './MenuSection'

const Menus = ({menusData}) => {
    const {title, description} = menusData[0]


    return (
        <div className={styles.Menu}>
            <div className={styles.MenuTitle}>{title}</div>
            <div className={styles.MenuDescription}>{description}</div>
            {menusData[0].subsections && menusData[0].subsections.map((subsection) => <MenuSection sectionData={subsection}/>)}
        </div>
    )

}
export default Menus