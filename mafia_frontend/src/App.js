import React from 'react';
import './App.css';
import Start from "./comp/Start";
import {BrowserRouter, Route} from "react-router-dom";
import CreateJoin from "./comp/CreateJoin";
import Room from "./comp/Room";

const App = (props) => {
      return (
          <BrowserRouter>
              <div className="wrapper">
                  <Route path="/" render={() => <Start state={props.state}
                                                       addUserID={props.addUserID}/>} />

                  <Route path="/" render={() => <CreateJoin state={props.state}
                                                            setUsersInRoom={props.setUsersInRoom}
                                                            setRoomStatus={props.setRoomStatus}/>}
                                                            setRoomID={props.setRoomID}/>
                  <Route path="/" render={() => <Room state={props.state} />} />
              </div>
          </BrowserRouter>
      )
}
export default App;
