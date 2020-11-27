import React from 'react';

const User = (props) => {
    return(
        <div>
            <ui>
                <li>Игрок: {props.user.id}</li>
            </ui>
        </div>
    )
}

export default User;