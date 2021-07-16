import React from 'react';
import styles from './AnimatingSelector.module.scss'

const AnimatingSelector = ({activeRef}) => (
    <div
        className={styles.Selector} style={{
        'transform': activeRef ? `translateX(${activeRef.offsetLeft}px) translateY(${activeRef.offsetTop}px` : undefined,
        'width': activeRef ? `${activeRef.clientWidth}px` : undefined,
        'height': activeRef ? `${activeRef.clientHeight}px` : undefined}}>
        <div className={styles.Left}>
        </div>
        <div className={styles.Right}>
        </div>
    </div>
)

export default AnimatingSelector