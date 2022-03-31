import React, { useState, createContext, useReducer } from "react";

const UserContext = createContext(null);

const ContextProv = (props) => {
    const [loggedUser, setLoggedUser] = useState("DUPA");
    const [state, dispatch] = useReducer(
            userReducer, 
            {
                'user': {'name': `no user logged!`, 'password': null},
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
    switch(action.type) {
        case `setUser`:
            return {...state, user: action.payload};
        case `setMenu`:
            return {...state, menu: action.payload};
        case 'logOut':
            return {...state, user: {'name': `no user logged!`, 'password': null}, menu: 'login'}
        default:
            throw new Error(`Unhandled action type ${action.type}`)
    }
}

export {UserContext};
export default ContextProv;