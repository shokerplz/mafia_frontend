import React from 'react';
import './App.css';
import Start from "./comp/Start";
import {BrowserRouter, Route} from "react-router-dom";


const App = (props) => {
      return (
          <div className="wrapper">
              <Start />
          </div>
      )
}
export default App;
