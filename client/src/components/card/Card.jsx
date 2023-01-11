import React from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ id, image, name, types }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={image} alt='Img not found' />
      <Link to={'/details/' + id} className={styles.name}>
        <h3>{name}</h3>
      </Link>
      {types?.map((t) => (
        <span className={styles.types} key={t}>
          {' '}
          {t}
        </span>
      ))}
    </div>
  )
}

export default Card
