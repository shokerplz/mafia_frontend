import React, {useState} from 'react';

let KillForm = (props) => {

    let Element2 = React.createRef( );

    const [targetUser, setTargetUser] = useState("");


    let killTextareaChangeHandler = () => {
        let txt = Element2.current.value;
        setTargetUser(txt);
    }

    let killButton = async e => {
        let response = await fetch(`http://127.0.0.1:5000/action?action=kill&user_id=${props.userID}&target_id=${targetUser}`,{method : 'POST'});
        let KillStatus = await response.json();
        if (KillStatus){
            console.log(KillStatus);
        }
    }

    if (props.role === "mafia"){
        return(
            <div>
                <p>Для мафии:</p>
                <textarea ref={Element2} onChange={killTextareaChangeHandler} />
                <button onClick={killButton}>Vote to kill</button>
            </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }
}

export default KillForm;

