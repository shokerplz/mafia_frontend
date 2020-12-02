import React, {useState} from 'react';
import styles from './Start.module.css';

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

    if (props.role === "mafia" && props.room.daytime === "night" && props.room.cicle === 2 && props.room.alive.includes(props.userID.toString())){
        return(
            <div>
                <p>Голосование за <span className={styles.killspan}>убийство</span></p>
                <div className={styles.voteform__voteform}>
                    <textarea placeholder="Введите ID" className={styles.voteform__textarea} ref={Element2} onChange={killTextareaChangeHandler} />
                    <button className={styles.voteform__button} onClick={killButton}>Проголосовать за убийство</button>
                </div>
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

