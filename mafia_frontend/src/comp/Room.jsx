import React from 'react';

const Room = (props) => {

    let setReady = async e => {
        let response = await fetch(`http://127.0.0.1:5000/ready?id=${props.state.USER_ID}`, {method : 'POST'});
        let status = await response.json();

        if (status){
            console.log(status);
        }
    }

    return(
        <div>
            <button onClick = {setReady}>Ready</button>
        </div>
    )
}

export default Room;