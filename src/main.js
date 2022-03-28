import React, { useState, useContext } from 'react';
import UserContext from './context';

const Main = () => {
    const user = useContext(UserContext);
return (
    <div>
        <p>Hello {user}</p>
        I am main!
    </div>
)};

export default Main;