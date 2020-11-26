import React from 'react';
import { useState } from 'react';
import {NavLink} from "react-router-dom";

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
            <NavLink to="/join">
                <button onClick = {getUserID}>Генерировать идентификатор для игры</button>
            </NavLink>

        </div>
    )
}
export default Start;