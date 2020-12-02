import React from 'react';
import styles from './Start.module.css';

let UsersLog = (props) => {
    let userStatus = "Ожидание готовности игроков";

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
        <div>

                <p>Игрок: {props.user.id} - Статус: {userStatus} </p>

        </div>
    )
}

export default UsersLog;