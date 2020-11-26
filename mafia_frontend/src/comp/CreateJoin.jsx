import React from 'react';

let CreateJoin = (props) => {

    let Element = React.createRef( );

    let CreateRoom = async e => {
        let response = await fetch(`http://127.0.0.1:5000/create?users=${props.state.UsersInRoom}&user_id=${props.state.USER_ID}`, {method : 'POST'})
        let Room = await response.json();

        if (Room){
            console.log(Room)
            props.setRoomStatus(Room);
        }
    }

    let JoinRoom = async e =>  {
       let response = await fetch(`http://127.0.0.1:5000/join?id=${ROOM_ID}&user_id=${props.state.USER_ID}`, {method : 'POST'});
        let joinStatus = await response.json();

        if (joinStatus){
            console.log(joinStatus);
            props.setRoomStatus(joinStatus);
        }
    }

    let isSuccess = () => {
        if (props.state.USER_ID !== "") {
            return props.state.USER_ID;
        }
    }

    let ROOM_ID = "";

    let changeHandler = ()  => {
        let text = Element.current.value;
        console.log(text);
        ROOM_ID = text;
    }

    if (isSuccess) {
        return (
            <div>
                <p>Количество  игроков: </p>
                <select value={props.state.UsersInRoom} onChange={(event) => props.setUsersInRoom(event.target.value) }>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>8</option>
                </select>
                <button onClick = {CreateRoom}>Создать комнату</button>
                <span>ID созданной комнаты: {props.state.Room.id}</span>
                <p>Присоединиться к комнате по ID:</p>

                <textarea ref={Element} onChange={changeHandler} />

                <button onClick = {JoinRoom}>Присоединиться</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Error!</h1>
            </div>
        )
    }
}

export default CreateJoin