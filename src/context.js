import React, { useState, createContext } from "react";

const UserContext = createContext(null);

const ContextProv = (props) => {
    const [loggedUser, setLoggedUser] = useState("DUPA");

    return(
        <UserContext.Provider value = {[loggedUser, setLoggedUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext};
export default ContextProv;