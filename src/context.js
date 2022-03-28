import React, {createContext} from "react";

const UserContext = createContext(null);
const SetUserContext = createContext(null);

export default UserContext;
export { SetUserContext };