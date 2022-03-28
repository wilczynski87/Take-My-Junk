import React, { useState, useContext } from 'react';
import UserContext from './context';

const Main = () => {
    const user = useContext(UserContext);
    // console.log(user);

return (
    <div>
        <p>Hello {user["email"]}</p>
        I am main!
    </div>
)};

export default Main;