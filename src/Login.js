import React, { useState, useContext } from 'react';
import logo from './logo.svg';
import { UserContext } from './context';

// const serverURL = "http://localhost:4000/user1";
const serverURL = "http://localhost:8081/consumerLogin/Dupa@dupa.com/dupa";

const LoginPanel = () => {
    const [userCont, setUserCont] = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState({'login': 'login...', 'password': 'password...'});

    // setUser("Siusiak");

    //supouse to ask for data of particular user
    const submitHandler = event => {
        event.preventDefault();
        let dataToSend = JSON.stringify({loginDetails});
        // console.log("Data to send " + dataToSend);
        getUser();
    }

    const getUser = async () => {
        const info = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }}
        const headers = { 'Content-Type': 'application/json'}
        const response = await fetch(serverURL, headers);
        if(response.ok) {
            const userRecived = await response.json();
            //console.log(userRecived);
            const wrapper = {type: 'setUser', payload: userRecived, };
            //console.log(userRecived);
            setUserCont({type: 'setMenu', payload: `main`})
            setUserCont(wrapper);
        } else {
            console.log(`Problem with a server status`)
        }
    }

    return(
        <div className=''>
            <img src={logo} className="App-logo" alt="logo" />
            <form
                onSubmit={event => submitHandler(event)}
            >
                <label for="fname">Login:</label> <br />
                <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    value = {loginDetails['login']}
                    onChange = {event => setLoginDetails(loginDetails => (
                        {
                            ...loginDetails, 
                            'login': event.target.value
                        }
                    ))}
                /> <br />
                <label for="lname">Password:</label> <br />
                <input 
                    type="password" 
                    id="lname" 
                    name="lname" 
                    value = {loginDetails.password}
                    onChange = {event => setLoginDetails(loginDetails => (
                        {
                            ...loginDetails, 
                            'password': event.target.value
                        }
                    ))}
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