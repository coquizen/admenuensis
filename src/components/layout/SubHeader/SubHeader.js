import React from 'react'
import styles from './SubHeader.module.scss'

const SubHeader = ({title}) => {
    return (
        <div className={styles.SubHeader}>{title}</div>
    )
}

export default SubHeader