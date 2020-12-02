import React from 'react';
import { useState } from 'react';
import UsersLog from "./UsersLog";
import styles from './Start.module.css';
import KillForm from "./KillForm";
import VoteForm from "./VoteForm"

let Start = () => {
    const [userID, setUserID] = useState("");
    const [usersInRoom, setUsersInRoom] = useState("2");
    const [room, setRoom] = useState({
        alive : [],
        cicle : "",
        daytime : "",
        id : 0,
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
            StateUpdater();
        }
    }

    let displayState = () => {
        console.log(room);
        console.log(userID.toString());
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

    return (
        <div>
            <button onClick={displayState}>State</button>
            <p>Ваш ID: {userID}</p>
            <button onClick = {getUserID}>Генерировать идентификатор для игры</button>
            <p>Количество  игроков: {usersInRoom}</p>
            <select value={usersInRoom} onChange={(event) => setUsersInRoom(event.target.value) }>
                <option>2</option>
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
            </select>

            <button onClick = {createRoom}>Создать комнату</button>
            <p>ID созданной комнаты: {room.id}</p>
            <p>Присоединиться к комнате по ID:</p>
            <textarea ref={Element} onChange={textareaChangeHandler} />
            <button onClick = {joinRoom}>Присоединиться</button>
            <p>Текущая комната: {room.id}</p>
            <button onClick={getReady}>Ready</button>
            <p>Игроки в комнате: </p>
            {room.users.map( (item) => <UsersLog user={item} room={room}/>)}
            <p>Role :  <span className = {styles.role}>{role}</span></p>
            <p>Статус комнаты : {room.state}</p>
            <p>Время : {room.daytime}</p>
            <KillForm room={room} role={role} userID={userID}/>
            <VoteForm room={room} userID={userID}/>
        </div>
    )
}

export default Start;