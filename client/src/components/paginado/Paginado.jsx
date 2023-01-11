import React from 'react'
import styles from './Paginado.module.css'

const Paginado = ({ pokemonsPerPage, allPokemons, paginado }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.container}>
      <div className={styles.ord}>
        {pageNumbers?.map(e => (
          <button key={e} onClick={() => paginado(e)} className={styles.btn}>{e}</button>
        ))}
      </div>
    </div>
  )
}

export default Paginado
