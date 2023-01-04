import React from "react";
import {Link, useParams,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deletePokemon } from "../../redux/actions/index";
import { useEffect } from "react";
import Loader from '../../img/loader.gif';
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
          navegacion('/home');
        }
    }

    return (
        <div className={styles.center}>
            <Link to= '/home'><button className={styles.btn}>Volver</button></Link>
            {
                myPokemon.name? (
                    <div className={styles.detalle}>
                        <div className={styles.titulo}><h1>{myPokemon.name}</h1> </div>
                        <div className={styles.carta}>
                            <img src={myPokemon.image} alt={myPokemon.name} width='500px' height='500px' />
                            <div className={styles.palabra}>
                                <h3  className={styles.tipos}>Tipos: {myPokemon.types?.map((e)=>(
                                    <span key={e}>{e}{" "}</span>
                                ))}</h3>
                                <h3>ID: {myPokemon.id}</h3>
                                <h3>Vida: {myPokemon.hp}</h3>
                                <h3>Fuerza: {myPokemon.attack}</h3>
                                <h3>Defensa: {myPokemon.defense}</h3>
                                <h3>Velocidad: {myPokemon.speed}</h3>
                                <h3>Altura: {myPokemon.height}</h3>
                                <h3>Peso: {myPokemon.weight}</h3>
                            </div>
                        </div>
                        {
                            myPokemon.createdInDb && (
                                <button onClick={handleDelete} className={styles.btn}>Eliminar</button>
                            )
                        }
                    </div>
                ) :(<div>
                    {/* <h2 className={estilos.cargando}>Cargando...</h2> */}
                    <img className={styles.loader}
                         src={Loader}
                         alt="Cargando..."
                         width="400px"
                         height="400px"
                    />
                </div>)

            }
        </div>
    )
}

export default Details