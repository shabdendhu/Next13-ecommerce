import React from 'react'
import styles from './Chip.module.scss'

const Chip = ({text}) => {
  return (
    <button className={styles.btn}>{text}</button>
  )
}

export default Chip
