import React from 'react';
import { useState } from 'react';

let Start = (props) => {
    const [userID, setUserID] = useState("");

    let getUserID = async e => {
        e.preventDefault();
        let response = await fetch('http://127.0.0.1:5000/get-user-id', {method : 'POST'})
        let ID = await response.json();

        if (ID){
            setUserID(ID.USER_ID)
            console.log(ID);
            props.addUserID(ID);
            console.log(props.state);
        }
    }

    return (
        <div>
            <p>Ваш ID: {props.state.USER_ID}</p>
            <button onClick = {getUserID}>Генерировать идентификатор для игры</button>
        </div>
    )
}
export default Start;