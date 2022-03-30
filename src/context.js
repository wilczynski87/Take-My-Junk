import React, { useState, createContext, useReducer } from "react";

const UserContext = createContext(null);

const ContextProv = (props) => {
    const [loggedUser, setLoggedUser] = useState("DUPA");
    const [state, dispatch] = useReducer(
            userReducer, 
            {
                'user': {'email': `no user logged!`, 'password': null},
                'menu': `login`
            }
        ); //the "state" should be named userMenu

    return(
        <UserContext.Provider value = {[state, dispatch]}>
            {props.children}
        </UserContext.Provider>
    );
}

const userReducer = (state, action) => {
    console.log(action);
    console.log(action.payload);
    switch(action.type) {
        case `setUser`:
            let test = {...state, user: action.payload}
            console.log(test);
            return {...state, user: action.payload};
        case `setMenu`:
            return {...state, menu: action.payload};
        default:
            throw new Error(`Unhandled action type ${action.type}`)
    }
}

export {UserContext};
export default ContextProv;