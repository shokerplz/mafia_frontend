import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state, {setUsersInRoom} from "./state/state";
import {addUserID} from "./state/state";
import {observer} from "./state/state";
import {setRoomStatus} from "./state/state";
import {setRoomID} from "./state/state";

export let renderApp = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 addUserID={addUserID}
                 setUsersInRoom={setUsersInRoom}
                 setRoomStatus={setRoomStatus}
                 setRoomID={setRoomID}/>

        </React.StrictMode>,
        document.getElementById('root')

    );
    console.log("rendered");
}
renderApp(state);
observer(renderApp);
reportWebVitals();

