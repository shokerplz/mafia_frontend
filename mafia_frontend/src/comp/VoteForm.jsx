import React, {useState} from 'react';
import styles from './Start.module.css';

let KillForm = (props) => {

    const [targetVote, setTargetVote] = useState("");
    let Element3 = React.createRef();

    let voteButton = async e => {
        let response = await fetch(`http://127.0.0.1:5000/action?action=vote&user_id=${props.userID}&target_id=${targetVote}`,{method : 'POST'});
        let VoteStatus = await response.json();
        if (VoteStatus){
            console.log(VoteStatus);
        }
    }

    let voteTextareaChangeHandler = () => {
        let txta = Element3.current.value;
        setTargetVote(txta);
    }

    if (props.room.daytime === "day") {
        return (
            <div>
                <p>ГОЛОСОВАНИЕ</p>
                <textarea ref={Element3} onChange={voteTextareaChangeHandler}/>
                <button onClick={voteButton}>otpravit' v tyur'mu</button>
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