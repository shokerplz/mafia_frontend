import React, {useState} from 'react';
import styles from './Start.module.css';

let KillForm = (props) => {
    let [textareaLog, setTextareaLog] = useState("")
    let [textareaLog2, setTextareaLog2] = useState("")
    const [targetVote, setTargetVote] = useState("");
    let Element3 = React.createRef();

    let voteButton = async e => {
        let flag = false;
        props.room.alive.forEach(user => {if (user.toString() === targetVote){flag = true}})
        if (flag) {
		console.log("userID: "+props.userID.toString())
            let response = await fetch(`http://127.0.0.1:5000/action?action=vote&user_id=${props.userID.toString()}&target_id=${targetVote}`, {method: 'POST'});
            let VoteStatus = await response.json();
            if (VoteStatus) {
                console.log(VoteStatus);
                setTextareaLog("Успешно!");
                setTextareaLog2("");
            }
        }else{
            setTextareaLog2("Некорректный ID");
        }
    }

    let voteTextareaChangeHandler = () => {
        let txta = Element3.current.value;
        setTargetVote(txta);
    }

    if (props.room.daytime === "day" && props.room.state === "vote" && props.room.alive.includes(props.userID)) {
        return (
            <div>
                <p>Голосование</p>
                <div className={styles.voteform__voteform}>
                    <textarea placeholder="Введите ID" className={styles.voteform__textarea} ref={Element3} onChange={voteTextareaChangeHandler}/>
                    <button className={styles.voteform__button} onClick={voteButton}>Проголосовать</button>
                </div>
                <p className={styles.green}>{textareaLog}</p>
                <p className={styles.red}>{textareaLog2}</p>
            </div>
        )
    } else {
        return(
            <div>

            </div>
        )
    }
}

export default KillForm;
