import React from 'react';
import styles from './Start.module.css';

const Header = () =>{
    return (
        <div className={styles.header}>
            <img src="https://ya-webdesign.com/transparent450_/handgun-vector-png-7.png" alt="" className={styles.logo} />
            <p className={styles.brand}>Mafia</p>
        </div>
    )
}
export default Header;