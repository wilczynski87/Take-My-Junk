import React, { useState, useContext } from 'react';
import logo from './szczalkiLogo.png';
import hammer from './mlotekLogo.png';
import { UserContext } from './context';
import FetchLoading from './FetchLoading';
import Alert from './Alert';


const url = `http://localhost:8081/getUser/`;

const LoginPanel = () => {
    const [userCont, setContext] = useContext(UserContext);

    const [loginDetails, setLoginDetails] = useState({'login': 'your@email.com', 'password': 'password...'});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(`w3-hide`);

    //Asking server for an user
    const submitHandler = event => {
        event.preventDefault();
        setIsLoading(true);
        let dataToSend = JSON.stringify({loginDetails});
        // setTimeout(() => getUser(), 2000); //for Loading test purpose

        getUser()
            .catch((e) => {
                setIsLoading(false);
                setAlert(`Problem with connection to backend... ${e}`);
        }); 
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

        const responseCons = await fetch(myUrl, info)
        //console.log(responseCons);

        if(responseCons.ok) {
        
            const userRecived = await responseCons.json();
            const wrapper = {type: 'setUser', payload: userRecived, };
            setIsLoading(false);

            await setContext(wrapper);
            await setContext({type: 'setMenu', payload: `main`});

        } else if(responseCons.status === 404) {

            setIsLoading(false);
            console.log(responseCons.status + `wrong details or User do not exist`);
            setAlert(`wrong details or User do not exist`);

        } else { 
            setIsLoading(false);
            setAlert(`Problem with connection to backend...`);
            console.log(`Problem with connection to backend... ${responseCons}`);
        }; 
        
    };

    const reg = () => {
        setContext({type: 'setMenu', payload: `register`});
    }

    return(
        <div className=''>
            { isLoading === true ? <FetchLoading message='I am loading User details' /> : null }
            { alert !== `w3-hide` ? <Alert message={alert} setAlert={setAlert} /> : null }
                <div>
                    <div className="w3-display-container">
                        <img src={logo} className="App-logo logo-spinner" alt="logo" />
                        <img src={hammer} className="hammer w3-display-topmiddle" />
                    </div>
                    <form
                        onSubmit={event => submitHandler(event)}
                    >
                        <label htmlFor="fname">Login:</label> <br />
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
                        <label htmlFor="lname">Password:</label> <br />
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
                    <div className=''>Don't have an account? <span onClick={reg} className='w3-button w3-card'>Register here.</span></div>
                    <hr />
                    <p>Facebook Icon</p>
                    <p>Google Icon</p>
                </div>
            
        </div>
    )
};

export default LoginPanel;