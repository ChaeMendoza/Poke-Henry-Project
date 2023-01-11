import React, { useEffect, useState } from 'react'
import Loader from '../../img/loader.gif'
import NotFound from '../../img/not-found.jpg'
import Logo from '../../img/logo.png'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import Paginado from '../../components/paginado/Paginado'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanDetail,
  filterByTypes,
  filterCreated,
  getPokemons,
  getTypes,
  orderByAttack,
  orderByName
} from '../../redux/actions'
import Card from '../../components/card/Card'
import Search from '../../components/search/Search'

const Home = () => {
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
  const allTypes = useSelector((state) => state.types)
  const loading = useSelector((state) => state.Loading)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes())
    dispatch(cleanDetail())
  }, [dispatch])

  function handleClick (e) {
    e.preventDefault()
    dispatch(getPokemons())
    setCurrentPage(1)
  }

  function handleFilterTypes (e) {
    e.preventDefault()
    dispatch(filterByTypes(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterCreated (e) {
    const resultado = dispatch(filterCreated(e.target.value))
    console.log(resultado)
    setCurrentPage(1)
  }

  function handleSort (e) {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleSortAttack (e) {
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.center}>
          <Link to='/'>
            <img className={styles.logo} src={Logo} alt='img not found' />
          </Link>
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link to='/create-new'>
              <button className={styles.btn}>New</button>
            </Link>
            <button className={styles.btn} onClick={handleClick}>Reset</button>
          </div>
          <div className={styles.centro}>
            <div className={styles.content}>
              <label>Ordenar Alfabéticamente:</label>
              <select onChange={handleSort} className={styles.select}>
                <option value='All'>Default</option>
                <option value='asc'>A - z</option>
                <option value='desc'>Z - A</option>
              </select>
            </div>
            <div className={styles.content}>
              <label>Ordenar Por Tipo:</label>
              <select onChange={(e) => handleFilterTypes(e)} className={styles.select}>
                <option value='All'>todos</option>
                {allTypes?.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div className={styles.content}>
              <label>Ordenar Por Fuerza:</label>
              <select onChange={handleSortAttack} className={styles.select}>
                <option value='All'>Default</option>
                <option value='max'>max</option>
                <option value='min'>min</option>
              </select>
            </div>
            <div className={styles.content}>
              <label>Ordenar por:</label>
              <select onChange={(e) => handleFilterCreated(e)} className={styles.select}>
                <option value='All'>Default</option>
                <option value='createdInDb'>Creados</option>
                <option value='api'>API</option>
              </select>
            </div>
          </div>
          <div className={styles.rigth}>
            <Search />
          </div>
        </div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

        <div className={styles.acomodar}>
          {loading
            ? (
              <div>
                <div className={styles.loader}>
                  <img
                    src={Loader}
                    alt='Cargando...'
                    width='200px'
                    height='200px'
                  />
                  <h3>Cargando...</h3>
                </div>
              </div>
              )

            : allTypes.length
              ? currentPokemons?.map(e => {
                return (
                  <Card id={e.id} image={e.image} name={e.name} types={e.types} key={e.id} />
                )
              })
              : (
                <div className={styles.card}>
                  <h1 className={styles.letra}>Este pokemon no fue encontrado</h1>
                  <img
                    src={NotFound}
                    alt='notFound'
                    width='400px'
                    height='400px'
                  />
                  <button onClick={handleClick} className={styles.btn2}>Entendido</button>
                </div>
                )}
        </div>
      </div>
      <footer className={styles.footer}>
        <p className={styles.footerText}>©️ 2022. Made with ❤️ by <strong> <a className={styles.a} href='https://github.com/ChaeMendoza' target='_blank' rel='noreferrer'>Israel M</a> </strong></p>
      </footer>
    </div>
  )
}

export default Home
