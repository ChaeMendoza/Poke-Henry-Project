import React from "react";
import styles from "./Nav.module.css";
import Search from "../search/Search";
import {useDispatch, useSelector} from "react-redux";
import {
    filterByTypes,
    filterCreated,
    orderByName,
    orderByAttack
} from "../../redux/actions";

const Nav = () => {
    const dispatch = useDispatch();
    const allTypes = useSelector((state)=> state.types)
    const handleFilterTypes = (e) => {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
        // setCurrentPage(1)
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value));
        // setCurrentPage(1)
    }

    const handleSort = (e) => {
        dispatch(orderByName(e.target.value));
        // setCurrentPage(1)
        // setOrden(`Ordenado ${e.target.value}`)
    }

    const handleSortAttack = (e) => {
        dispatch(orderByAttack(e.target.value));
        // setCurrentpage(1)
        // setOrden
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <button className={styles.btn}>New</button>
            </div>
            <div className={styles.center}>
                <div className={styles.content}>
                    <label>Ordenar Alfabéticamente:</label>
                    <select onChange={handleSort} className={styles.select}>
                        <option value="All">Default</option>
                        <option value="asc">A - z</option>
                        <option value="desc">Z - A</option>
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar Por Tipo:</label>
                    <select onChange={(e)=> handleFilterTypes(e)} className={styles.select}>
                        <option value="All">normal</option>
                        {allTypes?.map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar Por Fuerza:</label>
                    <select onChange={handleSortAttack} className={styles.select}>
                        <option value="All">Default</option>
                        <option value="max">max</option>
                        <option value="min">min</option>
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar por:</label>
                    <select onChange={(e)=> handleFilterCreated(e)} className={styles.select}>
                        <option value="All">Default</option>
                        <option value="createdInDb">Creados</option>
                        <option value="api">API</option>
                    </select>
                </div>
            </div>
            <div className={styles.rigth}>
                <Search />
            </div>
        </div>
    )
}

export default Nav