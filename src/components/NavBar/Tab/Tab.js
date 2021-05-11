import React, { useState } from 'react'
import classnames from 'classnames'
import styles from '../../Tab/Tab.module.scss'

const TabList = ({ menusData, children }) => {
    const [ activeTab, setActiveTab ] = useState(menusData[ 0 ].title)

    const onTabClick = (tab) => {
        setActiveTab(tab)
    }

    console.info(menusData)
    return (
        <div className={styles.Tabs}>
            <ol className={styles.TabList}>
                {menusData && menusData.map((menu) => <Tab data={menu} activeTab={activeTab} key={menu.title} label={menu.title} onClick={onTabClick} />)}
            </ol>
            <div className={styles.TabContent}>
                {children.map((child) => {
                    if (child.props.label !== activeTab) {
                        return undefined
                    }
                    return child.props.children
                })}
            </div>
        </div>
    )
}
export default Tab

const Tab = ({ data, onClick, activeTab }) => {

    return (
        <li className={classnames(styles.Tab, activeTab === data.title && styles.Active)} onClick={() => onClick(data.title)}>{data.title}</li>
    )
}
