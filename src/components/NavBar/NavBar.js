import React from 'react'
import styles from './NavBar.module.scss'
import Tab from './Tab'
import AnimatingSelector from './AnimatingSelector'
import usePositionAndDimension from "hooks/usePositionAndDimension";

const NavBar = ({setActiveMenu, activeMenu, menus}) => {
    const {activeRef, setActiveRef} = usePositionAndDimension()

    return (
        <div className={styles.NavBar}>
            <AnimatingSelector activeRef={activeRef}/>
            <div className={styles.NavList}>
                {menus?.map((menu) => <Tab setActiveRef={setActiveRef} menu={menu} activeMenu={activeMenu} key={menu.title} setActiveMenu={setActiveMenu} />)}
            </div>
        </div>
    )
}
export default NavBar