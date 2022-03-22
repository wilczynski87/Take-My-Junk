import React, { useState } from 'react';
import logo from './logo.svg';

const LoginPanel = () => {

    let login;
    let password;

    const [loginDetails, setLoginDetails] = useState({login: 'login', password: 'password'});

    const submitHandler = event => {
        event.preventDefault();
        let dataToSend = JSON.stringify({loginDetails});
        console.log(dataToSend);
    }

    return(
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <form
                onSubmit={event => submitHandler(event)}
            >
                <label for="fname">Login:</label> <br />
                <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    value = {loginDetails.login}
                    onChange={event => setLoginDetails(loginDetails => ({
                        ...loginDetails}, 
                        event.target.value
                    ))}
                /> <br />
                <label for="lname">Password:</label> <br />
                <input 
                    type="password" 
                    id="lname" 
                    name="lname" 
                    value = {loginDetails.password}
                /> <br />
                <input 
                    type="submit"
                    value="Logi In"
                ></input>
            </form>
            <p>Don't have an account? <span>Register here.</span></p>
            <hr />
            <p>Facebook Icon</p>
            <p>Google Icon</p>
        </div>
    )
};

export default LoginPanel;