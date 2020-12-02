import React from 'react';
import { useState } from 'react';
import UsersLog from "./UsersLog";
import styles from './Start.module.css';
import KillForm from "./KillForm";
import VoteForm from "./VoteForm"

let Start = () => {
    const [userID, setUserID] = useState("");
    const [usersInRoom, setUsersInRoom] = useState("3");
    const [condition, setCondition] = useState("1")
    const [room, setRoom] = useState({
        alive : [],
        cicle : "",
        daytime : "",
        id : "",
        jailed : [],
        killed : [],
        mafia :  [],
        max_users : "",
        peaceful : [],
        state : "",
        users : [{
            alive : "",
            id : "",
            ready : "",
            role : "",
            votes_against: 0
        }],
        voted : 0,
        voted_to_kill : 0
    });

    const [roomID, setRoomID] = useState("");
    const [role, setRole] = useState("");

    let Element = React.createRef( );

    let StateUpdater = () => {
        setInterval(async e => {
            let response = await fetch(`http://localhost:5000/status?id=${userID}`,{method : 'GET'});
            let RoomStatus = await response.json();
            if (RoomStatus) {
                setRoom(RoomStatus);
                getRole(RoomStatus);
                console.log(RoomStatus);
            }
        }, 1000)
    }

    let getUserID = async e => {
        let response = await fetch('http://127.0.0.1:5000/get-user-id', {method : 'POST'})
        let ID = await response.json();
        if (ID){
            setUserID(ID.USER_ID);
        }
    }

    let createRoom = async e => {
        let response = await fetch(`http://127.0.0.1:5000/create?users=${usersInRoom}&user_id=${userID}`, {method : 'POST'})
        let createStatus = await response.json();
        if (createStatus){
            console.log(createStatus);
            setRoom(createStatus);
            console.log(room);
            setRoomID(createStatus.id);
        }
    }

    let textareaChangeHandler = () => {
        let text = Element.current.value;
        setRoomID(text);
    }

    let joinRoom = async e => {
        let response = await fetch(`http://127.0.0.1:5000/join?id=${roomID}&user_id=${userID}`, {method : 'POST'});
        let joinStatus = await response.json();
        if (joinStatus){
            setRoom(joinStatus);
            console.log(room);
            setCondition("2")
            StateUpdater();
        }
    }

    let getReady = async e => {
        let response = await fetch(`http://127.0.0.1:5000/ready?id=${userID}`, {method : 'POST'});
        let status = await response.json();
        if (status){
            console.log(status);
        }
    }

    let getRole = (RoomStatus) => {
        if (RoomStatus.mafia.includes(userID.toString())){
            setRole("mafia");
        }
        if (RoomStatus.peaceful.includes(userID.toString())) {
            setRole("peaceful");
        }
        if (RoomStatus.killed.includes(userID.toString())){
            setRole("killed");
        }
        if (RoomStatus.jailed.includes(userID.toString())){
            setRole("jailed");
        }
    }

    if (condition === "2"){
        return (
            <div className={styles.room__wrapper}>
                <div className={styles.room__gamelog}>
                    <p>Текущая комната: {room.id}</p>
                    <p>Статус комнаты : {room.state}</p>
                    <p>Ваш ID: {userID}</p>
                    <p>Максимальное количество  игроков: {usersInRoom}</p>
                    <p>Роль :  <span className = {styles.role}>{role}</span></p>
                    <p>Время : {room.daytime}</p>
                </div>

                <div className={styles.room__userlog}>
                    <p className={styles.room__userlog__p}>Игроки в комнате: </p>
                    {room.users.map( (item) => <UsersLog user={item} room={room}/>)}
                </div>


                <button className={styles.room__readybutton} onClick={getReady}>Ready</button>
                <KillForm room={room} role={role} userID={userID}/>
                <VoteForm room={room} userID={userID}/>
            </div>
        )
    } else {
        return (
            <div className={styles.start__wrapper}>
                <p>Ваш ID: <span className={styles.start__userid}> {userID} </span></p>
                <button className={styles.start__genbutton} onClick = {getUserID}>Генерировать идентификатор для игры</button>

                <div className={styles.start__joinform}>
                    <div className={styles.start__create__wrapper}>
                        <p>Создать комнату:</p>
                        <div className={styles.start__joinform}>
                            <span id={styles.col}>Количество игроков </span>
                            <select className={styles.start__select} value={usersInRoom} onChange={(event) => setUsersInRoom(event.target.value) }>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                            </select>
                            <button className={styles.start__createbutton} onClick = {createRoom}>Создать</button>
                        </div>
                    </div>

                    <div className={styles.start__join__wrapper}>
                        <p>Присоединиться к комнате по ID:</p>
                        <div className={styles.start__joinform}>
                            <textarea className={styles.start__textarea} value={roomID} ref={Element} onChange={textareaChangeHandler} />
                            <button className={styles.start__joinbutton} onClick = {joinRoom}>Присоединиться</button>
                        </div>
                    </div>
                </div>
                <p className={styles.unvisible}>{room.id}</p>
                <p className={styles.unvisible}>{usersInRoom}</p>
            </div>
        )
    }
}

export default Start;