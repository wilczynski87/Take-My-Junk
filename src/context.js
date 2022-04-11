import React, { useState, createContext, useReducer } from "react";

const UserContext = createContext(null);

const initialRender = {
        'user': {'fullName': `no user logged!`, 'password': null},
        'auctions': {},
        'menu': `login`
    };

const ContextProv = (props) => {
    const [loggedUser, setLoggedUser] = useState("DUPA");
    const [state, dispatch] = useReducer(
            userReducer, initialRender
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
        case `setAuctions`: 
            return {...state, auctions: action.payload};
        case `deleteAuction`:
            return {auctions: action.payload};
        case 'logOut':
            return {...state, user: initialRender.user, menu: 'login'}
        default:
            throw new Error(`Unhandled action type ${action.type}`)
    }
}

export {UserContext};
export default ContextProv;