import React from 'react';

const User = (props) => {

    let readyStatus = "not ready"

    if (props.user.ready === "true"){
        readyStatus = "ready";
    }

    return(
        <div>
            <ui>
                <li>Игрок: {props.user.id} status: {readyStatus}</li>
            </ui>
        </div>
    )
}

export default User;