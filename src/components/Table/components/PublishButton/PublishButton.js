import React from 'react'
import classNames from "classnames"
import styles from './PublishButton.module.scss'

const PublishButton = ({ active }) => (
  <button type="button" className={classNames(styles.Publish, active && styles.Active)}>Publish</button>
)

export default PublishButton