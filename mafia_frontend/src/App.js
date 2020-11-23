import React from 'react';
import './App.css';
import Start from "./comp/Start";
//import {BrowserRouter, Route} from "react-router-dom";

const App = (props) => {
      return (
          //<BrowserRouter>
              <div className="wrapper">
                  <Start state={props.state} addUserID={props.addUserID}/>
              </div>
          //</BrowserRouter>
      )
}
export default App;
