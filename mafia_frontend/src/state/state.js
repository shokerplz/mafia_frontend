
let state = {
    USER_ID : ""
}

let renderApp = () => {
    console.log("State changed");
}

export let addUserID = (ID) => {
    state.USER_ID = ID.USER_ID;
    renderApp(state);
}

export const observer = (callback) => {
    renderApp = callback;
}

export default state;