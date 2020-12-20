import React from 'react';
import styles from './Start.module.css';

let UsersLog = (props) => {
    let userStatus = "Ожидание готовности";


    if (props.user.ready === "true" && props.room.mafia.length === 0){
        userStatus = "Готов";
    }
    if (props.room.mafia.includes(props.user.id.toString()) || props.room.peaceful.includes(props.user.id.toString())) {
        userStatus = "Жив";
    }
    if (props.room.killed.includes(props.user.id.toString())) {
        userStatus = "Мертв";
    }
    if (props.room.jailed.includes(props.user.id.toString())) {
        userStatus = "В тюрьме"
    }


    return(
        <div className={styles.margin}>
            <p>Игрок: <span className={styles.id}>{props.user.id}</span> - Статус: {userStatus} </p>
        </div>
    )
}

export default UsersLog;