/*
- function to validate user type on backend
- fetch zrobic
*/
import React, {useState, useContext} from 'react';
import backIcon from './arrow_back_ios_black_24dp.svg';
import { UserContext } from './context';

const url = `http://localhost:8081/`;

const Register = () => {
    const [menu, setMenu] = useContext(UserContext);

    const [user, setUser] = useState({
        fullName: 'your full name...',
        email: 'your@email.com',
        address: 'your address...',
        phone: 'your phone...',
        firm: 'firm...',
        password: 'password...',
        rPassword: 'password...',
        licenseNo: '',
        userType: 'Consumer'
    })

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
            console.log(toSend);
            submitData();
            back();
        }
    }

    const submitData = async () => {
        //URL creator
        const cons = "consumerSignIn";
        const prof = "professionalSignIn";
        let urlFetch = url;
        urlFetch += user.userType === `Consumer`? cons : prof;
        console.log(urlFetch);

        //Body creator
        const header = {};
        const data = {
            ...user
            }
        delete data.rPassword;
        delete data.userType;
        if(user.userType === `Consumer`) delete data.licenseNo;

        const response = await fetch(urlFetch, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            console.log(responseJson);
    }

    const back = () => {
        setMenu({type: 'setMenu', payload: 'login'});
    }

    const onValueChange = (event) => {
        setUser({
            ...user,
            userType: event.target.value
        });
    }

    return(
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
    );
};

export default Register;