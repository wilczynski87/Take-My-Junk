/*
- option to swich from consumer to Provider
*/
import React, {useState, useContext, useReducer} from 'react';
import { UserContext } from './context';
import Menu from './menu';
import Alert from './Alert';
import FindAddress from './FindAddress';

const Settings = () => {
    const [context, setContext] = useContext(UserContext);

    const [user, setUser] = useState(context.user);
    const [alert, setAlert] = useState(`w3-hide`);
    const [address, setAddress] = useState({...user.address});

    const [toggler, clickToggler] = useReducer((toggler) => {return !toggler}, false);

    const url = context.url;

    const hide = (condition) => {
        return condition === `id` || condition === `address` ? ` w3-hide` : null;
    }

    const details = (key) => {
        return (
            <div key={key} className={hide(key)}>
                <label>{key}:</label> 
                <input 
                    name={key} 
                    value={user[key]}
                    type='text'
                    onChange={event => setUser( 
                        {
                            ...user,
                            [key]: event.target.value
                        }
                    )}
                />
            </div>
        )
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        //url builder
        let myUrl = url + [`licenseNo` in user ? `professionalChange/` : `consumerChange/`];
        myUrl += `${context.user.email}/${context.user.password}`;
        
        //fetch builder
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const data = {
            ...user,
            address: address
        };

        //fetch
        const response = await fetch(myUrl, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        });
        if(response.status === 202) {
            const responseJson = await response.json();
            console.log(responseJson);
            setContext({type: 'setUser', payload: responseJson});
        } else if(response.status === 226) { //if number goood?
            console.log(response);
            setAlert("User with that email, alredy exist");
        } else {
            console.log(response);
            setAlert("Can not find yours details! or other issue...");
        }

        //info about changed details -> succes or NOT?!
        
    }

    const deleteAccount = async (event) => {
        event.preventDefault();
        //url builder
        let myUrl = url + [`licenseNo` in user ? `professionalDelete/` : `consumerDelete/`];
        myUrl += `${user.email}/${user.password}`;

        //fetch builder
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        //fetch
        const response = await fetch(myUrl, {
            method: 'DELETE',
            headers: header,
        });
        const responseJson = await response.json();
        console.log(responseJson);

        //info about changed details -> succes or NOT?!
    }

    const findAddress = (event) => {
        event.preventDefault();
        clickToggler();
    };

    return (
        <div>
            {alert !== `w3-hide` ? <Alert message={alert} setAlert={setAlert} /> : null}
            {toggler ? <div className='w3-display-middle'><FindAddress setAddressLable={setAddress} clickToggler={clickToggler} /></div> : null}
            <div className='w3-panel'> 
                <div className='w3-left'>I am Settings!</div> 
                <div className='w3-right'><Menu /></div> 
            </div>
            <form onSubmit={(event) => submitHandler(event)}>
                {Object.keys(user).map(details)}
                <button onClick={(e) => findAddress(e)}>Find Address</button> <br />
                {address.label === undefined ? `Find address...` : address.label}
                <input type='submit' value='Submit changes' />
            </form>
            <form onSubmit={(event) => deleteAccount(event)}>
                <label>Do you want to delete an account?</label> <br />
                <label>password: </label> <input type='password' value={user.password} onChange={event => setUser( 
                        {
                            ...user,
                            password: event.target.value
                        }
                    )}/> <br />
                    <input type='submit' value='Delete Account'></input>
            </form>
        </div>
    )
}

export default Settings;