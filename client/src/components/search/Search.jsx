import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemons } from '../../redux/actions/index'
import styles from './Search.module.css'
import Lupa from '../../img/lupa.png'

const Search = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      dispatch(getNamePokemons(name))
      setName('')
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='text'
        value={name}
        onChange={handleInputChange}
      />
      <button className={styles.btn} onClick={handleSubmit}>
        <img className={styles.lupa} src={Lupa} alt='img not found' />
      </button>
    </div>
  )
}

export default Search
