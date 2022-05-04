import React, { useState, useContext } from 'react';
import logo from './myLogo.png';
import { UserContext } from './context';
import FetchLoading from './FetchLoading';


const url = `http://localhost:8081/getUser/`;

const LoginPanel = () => {
    const [userCont, setContext] = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState({'login': 'your@email.com', 'password': 'password...'});
    const [isLoading, setIsLoading] = useState(false);

    //Asking server for an user
    const submitHandler = event => {
        event.preventDefault();
        setIsLoading(true);
        let dataToSend = JSON.stringify({loginDetails});
        setTimeout(() => getUser(), 2000); //for Loading test purpose
        // getUser();
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
            setIsLoading(false);

            await setContext(wrapper);
            await setContext({type: 'setMenu', payload: `main`});

        } else if(responseCons.status === 404) {

            setIsLoading(false);
            console.log(responseCons.status + `wrong details or User do not exist`);
            alert(`wrong details or User do not exist`);

        } else { 
            console.log(`Problem with a server status ${responseCons.status}`);
            setIsLoading(false);
        }
        
    }

    const reg = () => {
        setContext({type: 'setMenu', payload: `register`});
    }

    return(
        <div className=''>
            { isLoading === true ? <FetchLoading message='I am loading User details' /> : null }
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
            
        </div>
    )
};

export default LoginPanel;