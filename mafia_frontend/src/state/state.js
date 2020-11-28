
let state = {
    USER_ID : "",
    UsersInRoom : 2,
    Room : {
        users:[{id:"",ready:"false"}],
    },
    ROOM_ID : "",
}

let renderApp = () => {
    console.log("State changed");
}

export let addUserID = (ID) => {
    state.USER_ID = ID.USER_ID;
    renderApp(state);
}

export let setUsersInRoom = (c) => {
    state.UsersInRoom = Number.parseInt(c);
    renderApp(state);
    console.log(state);
}

export let setRoomStatus = (c) => {
    state.Room = c;
    renderApp(state);
    console.log(state);
}

export let setRoomID = (text) =>  {
    state.ROOM_ID = text;
    renderApp(state);
    console.log(state);
}

export let AddRoomID = () => {

}

export const observer = (callback) => {
    renderApp = callback;
}

export default state;