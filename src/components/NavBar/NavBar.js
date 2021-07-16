import React from 'react'
import styles from './NavBar.module.scss'
import Tab from './Tab'
import Form from 'components/Form'
import { Section } from 'components/Form/forms'
import { useModal } from 'context/ModalProvider'
import { useData } from 'context/DataProvider'
import AnimatingSelector from './AnimatingSelector'
import usePositionAndDimension from "hooks/usePositionAndDimension";
import {TabButton} from "./Tab/Tab";

const NavBar = ({setActiveMenu, activeMenu}) => {
    const { menus } = useData()
    const { insertComponent } = useModal()
    const {activeRef, setActiveRef} = usePositionAndDimension()

    // const blankSectionData = {
    //     id: "blank-section",
    //     title: "",
    //     description: "",
    //     section_id: activeMenu?.id,
    //     type: "Category",
    //     active: true,
    //     visible: true,
    //     list_order: -1,
    //     subsections: [],
    //     items: []
    //
    // }
    const handleClick = (event) => {
        event.preventDefault()
        insertComponent(<Form label={'Add Menu'} form={<Section />} />)
    }

    return (
        <div className={styles.NavBar}>
            <AnimatingSelector activeRef={activeRef}/>
            <div className={styles.NavList}>
                {menus && menus?.map((menu) => <Tab setActiveRef={setActiveRef} menu={menu} activeMenu={activeMenu} key={menu.title} setActiveMenu={setActiveMenu} />)}
                <TabButton handleClick={handleClick} setActiveRef={setActiveRef}  activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            </div>
        </div>
    )
}

export default NavBar