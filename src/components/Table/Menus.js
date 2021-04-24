import React from 'react'
import Handle from './Handle'
import {rectSwappingStrategy, SortableContext, useSortable} from '@dnd-kit/sortable'
import styles from './Menus.module.scss'


const Menus = ({menusData}) => {
    const {id, title, description} = menusData

    const { listeners, attributes } = useSortable({id})
    return (

        <div className={styles.Menu}>
            <div className={styles.Handle}>
                <Handle listeners={listeners} attributes={attributes} />
            </div>
            <div className={styles.MenuTitle}>{title}</div>
            <div className={styles.MenuDescription}>{description ? description : "Description ..."}</div>
            {menusData.subsections && <SortableContext items={menusData.subsections.map((menu)=> menu.id)}
                                                       strategy={rectSwappingStrategy}><Dropp</SortableContext>}
        </div>
    )

}
export default Menus