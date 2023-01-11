import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../../redux/actions/index'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../img/logo-2.png'
import styles from './CreateNew.module.css'

const CreateNew = () => {
  const dispatch = useDispatch()
  const myTypes = useSelector((state) => state.types)
  const navegacion = useNavigate()

  const [objeto, setObjeto] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  })

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  function handleTypes (e) {
    if (e.target.checked) {
      setObjeto({
        ...objeto,
        types: [...objeto.types, e.target.value]
      })
    }
    if (!e.target.checked) {
      setObjeto({
        ...objeto,
        types: objeto.types.filter((el) => e.target.value !== el)
      })
    }
  }

  const nombreValido = /^[a-zA-ZñÑ]+$/i

  function handleSubmit (e) {
    e.preventDefault()
    if (!objeto.name || objeto.name.length > 20 || !nombreValido.test(objeto.name)) {
      return alert('Solo puede llevar letras y su largo debe ser menor a 20')
    } else if (!objeto.hp || objeto.hp <= 0 || objeto.hp > 200) {
      return alert('Debe ser mayor a 0 y menor a 200')
    } else if (!objeto.attack || objeto.attack <= 0 || objeto.attack > 200) {
      return alert('Debe ser mayor a 0 y menor a 200')
    } else if (!objeto.defense || objeto.defense <= 0 || objeto.defense > 200) {
      return alert('Debe ser mayor a 0 y menor a 200')
    } else if (!objeto.speed || objeto.speed <= 0 || objeto.speed > 300) {
      return alert('Debe ser mayor a 0 y menor a 300')
    } else if (!objeto.height || objeto.height <= 0 || objeto.height > 100) {
      return alert('Debe ser mayor a 0 y menor a 100')
    } else if (!objeto.weight || objeto.weight <= 0 || objeto.weight > 1000) {
      return alert('Debe ser mayor a 0 y menor a 1000')
    } else if (objeto.types.length === 0 || objeto.types.length > 2) {
      return alert('Solo pueden seleccionarse máximo 2 tipos')
    }
    dispatch(postPokemon(objeto))
    navegacion('/home')
    alert('Pokemon Agregado Exitosamente!')
  }
  return (
    <div className={styles.container}>
      <Link to='/home'>
        <button className={styles.btn}>Volver</button>
      </Link>
      <img className={styles.logo} src={Logo} alt='img not found' />
      <form onSubmit={handleSubmit} className={styles.todo}>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Nombre: </label>
          <input
            type='text'
            onChange={(e) =>
              setObjeto({ ...objeto, name: e.target.value.toLowerCase() })}
            className={styles.contenedor}
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Imagen: </label>
          <input
            type='url'
            id='url'
            name='url'
            placeholder='Url opcional...'
            onChange={(e) => setObjeto({ ...objeto, image: e.target.value })}
            className={styles.contenedor}
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Vida: </label>
          <input
            type='number'
            placeholder='0-200'
            onChange={(e) => setObjeto({ ...objeto, hp: e.target.value })}
            className={styles.contenedor}
            min='0'
            max='199'
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Ataque: </label>
          <input
            type='number'
            placeholder='0-200'
            onChange={(e) => setObjeto({ ...objeto, attack: e.target.value })}
            className={styles.contenedor}
            min='0'
            max='200'
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Defensa: </label>
          <input
            type='number'
            placeholder='0-200'
            onChange={(e) => setObjeto({ ...objeto, defense: e.target.value })}
            className={styles.contenedor}
            min='0'
            max='199'
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Velocidad: </label>
          <input
            type='number'
            placeholder='0-300'
            onChange={(e) => setObjeto({ ...objeto, speed: e.target.value })}
            className={styles.contenedor}
            min='0'
            max='299'
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Altura: </label>
          <input
            type='number'
            placeholder='0-100'
            onChange={(e) => setObjeto({ ...objeto, height: e.target.value })}
            className={styles.contenedor}
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Peso: </label>
          <input
            type='number'
            placeholder='0-1000'
            onChange={(e) => setObjeto({ ...objeto, weight: e.target.value })}
            className={styles.contenedor}
            min='0'
            max='999'
            required
          />
        </div>
        <div className={styles.cuadro}>
          <label className={styles.palabra}>Tipos: </label>

          <div className={styles.check}>
            {myTypes?.map((e) => (
              <label key={e} className={styles.palabra}>
                <input
                  type='checkbox'
                  name={e}
                  value={e}
                  onChange={handleTypes}
                  className={styles.cuadritos}
                />
                {e}{' '}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.center}>
          <button type='submit' className={styles.btnSubmit}>
            ¡Agregar Pokemon!
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew
