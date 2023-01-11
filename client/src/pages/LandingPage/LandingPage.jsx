import React from 'react'
import styles from './Landing.module.css'
import Logo from '../../img/logo.png'
import PokeImg from '../../img/pokemons.png'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <div className={styles.center}>
        <img className={styles.logo} src={Logo} alt='img not found' />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.text}>
            Construir una App utilizando React, <br />
            Redux, Node y Sequelize. <br />
            Afirmar y conectar los conceptos <br />
            aprendidos en la carrera. <br />
            Aprender mejores prácticas. Aprender y <br />
            prácticar el worklofw de GIT. <br />
            Usar y practicar testing.
          </p>
        </div>
        <div className={styles.right}>
          <img className={styles.img} src={PokeImg} alt='img not found' />
        </div>
      </div>
      <div className={styles.center}>
        <Link to='/home'>
          <button className={styles.btn}>
            START
          </button>
        </Link>
      </div>
      <footer className={styles.footer}>
        <p className={styles.footerText}>©️ 2022. Made with ❤️ by <strong> <a className={styles.a} href='https://github.com/ChaeMendoza' target='_blank' rel='noreferrer'>Israel M</a> </strong></p>
      </footer>
    </div>
  )
}

export default LandingPage
