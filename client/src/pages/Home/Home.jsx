import React from "react";
import Logo from "../../img/logo.png";
import styles from "./Home.module.css";
import Nav from "../../components/nav/Nav";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.center}>
                    <Link to="/">
                        <img className={styles.logo} src={Logo} alt="img not found" />
                    </Link>
                </div>
                <Nav />
            </div>
        </div>
    )
}

export default Home