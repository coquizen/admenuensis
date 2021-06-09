import React from 'react'
import styles from './Spinner.module.scss'

const Spinner = () => (
    <div className={styles.Spinner} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
)

export default Spinner