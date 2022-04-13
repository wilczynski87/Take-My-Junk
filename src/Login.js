/*
- need to create one fetch for login and backed should retrive right user
*/
import React, { useState, useContext } from 'react';
import logo from './logo.svg';
import { UserContext } from './context';

const consURL = "http://localhost:8081/consumerLogin/your1@email.com/password...";
const profURL = "http://localhost:8081/professionalLogin/your@email.com/password...";

const LoginPanel = () => {
    const [userCont, setContext] = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState({'login': 'login...', 'password': 'password...'});

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
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }}

        const headers = { 'Content-Type': 'application/json'}
        
        const responseCons = await fetch(consURL, headers);

        if(responseCons.ok) {

            const userRecived = await responseCons.json();
            const wrapper = {type: 'setUser', payload: userRecived, };

            await setContext(wrapper);
            await setContext({type: 'setMenu', payload: `main`});

        } else if(responseCons.status === 404) {

            const responseProf = await fetch(profURL, headers);

            if(responseProf.ok) {

                const userRecived = await responseProf.json();
                const wrapper = {type: 'setUser', payload: userRecived, };
                
                await setContext(wrapper);
                await setContext({type: 'setMenu', payload: `main`});

            } else console.log(`There is not such user ${responseProf.status}`);

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