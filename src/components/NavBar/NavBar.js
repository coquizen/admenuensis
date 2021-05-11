import React from 'react'
import styles from './Tab.module.scss'
import Tab from './Tab'

const NavBar = ({setActiveLabel, activeLabel, menus}) => {
    return (
        <div className={styles.NavBar}>
            <AnimatingSelector />
            <ol className={styles.NavList}>
                {menus && menus.map((menu) => <Tab label={menu.title} activeLabel={activeLabel} key={menu.title} onClick={setActiveLabel} />)}
            </ol>
        </div>
    )
}