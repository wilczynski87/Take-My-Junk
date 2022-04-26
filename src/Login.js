import React, { useState, useContext } from 'react';
import logo from './myLogo.png';
import { UserContext } from './context';

const url = `http://localhost:8081/getUser/`;

const LoginPanel = () => {
    const [userCont, setContext] = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState({'login': 'your@email.com', 'password': 'password...'});

    //Asking server for an user
    const submitHandler = event => {
        event.preventDefault();
        let dataToSend = JSON.stringify({loginDetails});
        getUser();
        /*
            validation
        */
    }

    const getUser = async () => {
        //URL builder
        const myUrl = url + loginDetails.login + `/` + loginDetails.password;
        
        //fetch builder
        const info = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        };
        
        const responseCons = await fetch(myUrl, info);

        if(responseCons.ok) {

            const userRecived = await responseCons.json();
            const wrapper = {type: 'setUser', payload: userRecived, };

            await setContext(wrapper);
            await setContext({type: 'setMenu', payload: `main`});

        } else if(responseCons.status === 404) {

            console.log(responseCons.status + `wrong details or User do not exist`);
            alert(`wrong details or User do not exist`);

        } else console.log(`Problem with a server status ${responseCons.status}`);
    }

    const reg = () => {
        setContext({type: 'setMenu', payload: `register`});
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
            <p>Don't have an account? <span onClick={reg}>Register here.</span></p>
            <hr />
            <p>Facebook Icon</p>
            <p>Google Icon</p>
        </div>
    )
};

export default LoginPanel;