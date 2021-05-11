import React, {useEffect, useState} from 'react'
import {useData} from 'context/DataProvider'
import styles from './MenuView.module.scss'
import Tab from '../Tab/Tab'
import Table from 'components/DragAndDrop/Table'

const MenuView = () => {
    const { menus } = useData()
    const [menusData, setMenusData] = useState()

    useEffect(() => {
        setMenusData(menus)
    }, [menus])

    return (<div className={styles.Menus}></div>
    )
}

const Menu = ({label, data}) => (
    <div className={styles.MenuContent} label={label}>
        Hey Dude{data.title}
    </div>
)
export default MenuView