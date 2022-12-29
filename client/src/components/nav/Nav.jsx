import React from "react";
import styles from "./Nav.module.css";
import Search from "../search/Search";

const Nav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <button className={styles.btn}>New</button>
            </div>
            <div className={styles.center}>
                <div className={styles.content}>
                    <label>Ordenar Alfabéticamente:</label>
                    <select className={styles.select}>
                        <option>Default</option>
                        <option>A - z</option>
                        <option>Z - A</option>
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar Por Tipo:</label>
                    <select className={styles.select}>
                        <option>normal</option>
                        <option>fighting</option>
                        <option>flying</option>
                        <option>poison</option>
                        <option>ground</option>
                        <option>rock</option>
                        <option>bug</option>
                        <option>ghost</option>
                        <option>steel</option>
                        <option>fire</option>
                        <option>water</option>
                        <option>grass</option>
                        <option>electric</option>
                        <option>psychic</option>
                        <option>ice</option>
                        <option>dragon</option>
                        <option>dark</option>
                        <option>fairy</option>
                        <option>unknown</option>
                        <option>shadow</option>
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar Por Fuerza:</label>
                    <select className={styles.select}>
                        <option>Default</option>
                        <option>max</option>
                        <option>min</option>
                    </select>
                </div>
                <div className={styles.content}>
                    <label>Ordenar por:</label>
                    <select className={styles.select}>
                        <option>Default</option>
                        <option>Creados</option>
                        <option>API</option>
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