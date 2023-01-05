import React from "react";
import {Link, useParams,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deletePokemon } from "../../redux/actions/index";
import { useEffect } from "react";
import Loader from '../../img/loader.gif';
import Logo from '../../img/logo-3.png';
import styles from "./Details.module.css";

const Details = () => {
    const dispatch= useDispatch()
    const {id} = useParams()
    const myPokemon = useSelector((state)=> state.detail)
    const loading = useSelector((state)=> state.Loading)
    const navegacion = useNavigate()

    useEffect(()=>{
        dispatch(getDetail(id))
    }, [id,dispatch])

    function handleDelete(e){
        e.preventDefault()
        const confirmacion = window.confirm('¿Estas seguro de que quieres eliminar este pokemon?');
        if (confirmacion) {
          dispatch(deletePokemon(myPokemon.id));
          navegacion('/details');
        }
    }

    return (
        <div className={styles.center}>
            <img className={styles.logo} src={Logo} alt="img not found" />
            {
                myPokemon.name? (
                    <div className={styles.detalle}>
                        <div className={styles.title}><h1>{myPokemon.name}</h1> </div>
                        <div className={styles.carta}>
                            <img className={styles.img} src={myPokemon.image} alt={myPokemon.name} />
                            <div className={styles.palabra}>
                                <h3  className={styles.tipos}><span className={styles.span}>Tipos:</span> {myPokemon.types?.map((e)=>(
                                    <span key={e}>{e}{" "}</span>
                                ))}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>ID:</span> {myPokemon.id}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Vida:</span> {myPokemon.hp}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Fuerza:</span> {myPokemon.attack}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Defensa:</span> {myPokemon.defense}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Velocidad:</span> {myPokemon.speed}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Altura:</span> {myPokemon.height}</h3>
                                <h3 className={styles.tipos}><span className={styles.span}>Peso:</span> {myPokemon.weight}</h3>
                            </div>
                        </div>
                        {
                            myPokemon.createdInDb && (
                                <button onClick={handleDelete} className={styles.btn}>Eliminar</button>
                            )
                        }
                    </div>
                ) :(<div className={styles.loader}>
                    {/* <h2 className={estilos.cargando}>Cargando...</h2> */}
                    <img
                         src={Loader}
                         alt="Cargando..."
                         width="400px"
                         height="400px"
                    />
                    <h3>Cargando...</h3>
                </div>)
            }
            <Link to= '/home'><button className={styles.btn}>Volver</button></Link>
            <footer className={styles.footer}>
                <p className={styles.footerText}>©️ 2022. Made with ❤️ by <strong> <a className={styles.a} href="https://github.com/ChaeMendoza" target="_blank">Israel M</a> </strong></p>
            </footer>
        </div>
    )
}

export default Details