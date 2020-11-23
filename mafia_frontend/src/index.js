import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state from "./state/state";
import {addUserID} from "./state/state";
import {observer} from "./state/state";


export let renderApp = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addUserID={addUserID} />
        </React.StrictMode>,
        document.getElementById('root')

    );
    console.log("rendered");
}
renderApp(state);
observer(renderApp);
reportWebVitals();

