import React, {useState, useContext, useReducer} from 'react';
import backIcon from './arrow_back_ios_black_24dp.svg';
import { UserContext } from './context';
import Alert from './Alert.js';
import FindAddress from './FindAddress';

const url = `http://localhost:8081/`;

const Register = () => {
    const [menu, setMenu] = useContext(UserContext);
    const [displayAlert, setAlert] = useState(`w3-hide`);

    const [address, setAddress] = useState({});
    const [toggler, clickToggler] = useReducer((toggler) => {return !toggler}, false);

    const [user, setUser] = useState({
        fullName: 'your full name...',
        email: 'your@email.com',
        phone: 'your phone...',
        firm: 'firm...',
        password: 'password...',
        rPassword: 'password...',
        licenseNo: '',
        userType: 'Consumer'
    })

    const findAddress = (event) => {
        event.preventDefault();
        clickToggler();
    };

    const nameValidator = (name) => {
        switch(name) {
            case 'fullName':
                return 'Full name: ';
            case 'rPassword':
                return 'Repead password: ';
            default: 
                name = name.split("");
                name[0] = name[0].toUpperCase();
                name = name.join("") + ": ";
                return name;
        }
    }

    const typeValidator = (type) => {
        switch(type) {
            case `address`:
                return `button`;
            case 'email':
                return 'email';
            case 'phone':
                return 'tel'
            default:
                return 'text';
        }
    }

    const inputer = (key) => {
        return (
            <div key={key}> 
                <label for={key}>{nameValidator(key)}</label> <br />
                        <input 
                            type={typeValidator(key)} 
                            id={key} 
                            name={key}
                            value = {user[key]}
                            onClick = {() => setUser(user => (
                                {
                                    ...user, 
                                    [key]: ""
                                }
                            ))}
                            onChange = {event => setUser(user => (
                                {
                                    ...user, 
                                    [key]: event.target.value
                                }
                            ))}
                        /> <br />
            </div>
        );
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(user.password !== user.rPassword) {
            alert("Passwords do not match");
        } else {
            const toSend = JSON.stringify(user);
            // console.log(toSend);
            submitData();
        }
    }

    const submitData = async () => {
        //URL creator
        const cons = "consumerSignIn";
        const prof = "professionalSignIn";
        let urlFetch = url;
        urlFetch += user.userType === `Consumer`? cons : prof;

        //Body creator
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            };
        const data = {
            ...user,
            address: {...address}
            }
        delete data.rPassword;
        delete data.userType;

        if(user.userType === `Consumer`) delete data.licenseNo;

        //fetch
        const response = await fetch(urlFetch, {
            method: 'POST',
            credentials: 'same-origin',
            headers: header,
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
            }
        );
        
        //after fetch
        if(response.status === 226) {
            console.log("Client already exist");
            alert();
        } else if(response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            back();
        } else {
            console.log(`error code: ${response.status}`);
            alert("Can not register this Client");
        }
        
    }

    const back = () => {
        setMenu({type: 'setMenu', payload: 'login'});
    }

    const alert = () => {
        setAlert(`w3-show`);
    }

    const onValueChange = (event) => {
        setUser({
            ...user,
            userType: event.target.value
        });
    }

    return(
        <div className=''>
            <div><Alert message={`User already exist!`} displayAlert={displayAlert} setAlert={setAlert} /></div>
            {toggler ? <div className='w3-display-middle'><FindAddress setAddressLable={setAddress} clickToggler={clickToggler} /></div> : null}
                             
            <div>
                
                <div className='w3-panel'>
                    <div className='w3-left' >Registration: </div>
                    <img src={backIcon} className="w3-right" alt="back to Login In menu" onClick={back} />
                </div>
                <div>
                    <form onSubmit={(event) => submitHandler(event)}>
                        {
                        Object.keys(user)
                            .filter((key) => {
                                return user.userType === `Consumer` && key === `licenseNo` ? null : key;
                            })
                            .filter((key) => {
                                return key === `userType` ? null : key; 
                            })
                            .map((key) => {
                            return inputer(key);
                            })
                        }
                        <div>
                            <button onClick={(e) => findAddress(e)}>Find Address</button> <br />
                            {address.label === undefined ? `Find address...` : address.label}
                        </div> <br />
                        <input 
                            type='radio' 
                            value='Consumer' 
                            name='userType' 
                            onChange={onValueChange}
                            checked = {user.userType === `Consumer`}
                        />
                        <label>I am Consumer - I have junk to dispouse</label> <br />
                        <input 
                            type='radio' 
                            value='Provider' 
                            name='userType' 
                            onChange={onValueChange}
                            checked = {user.userType === `Provider`}
                        /> 
                        <label>I am Provider - I will dispouse yours junk</label><br />
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;