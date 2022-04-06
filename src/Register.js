/*
- checking if details put correctly
- change inputs name
- consider password menu
- function to validate user on backend
*/
import React, {useState, useContext} from 'react';
import backIcon from './arrow_back_ios_black_24dp.svg';
import { UserContext } from './context';


const Register = () => {
    const [menu, setMenu] = useContext(UserContext);

    const [user, setUser] = useState({
        fullName: 'your full name...',
        email: 'your email...',
        address: 'your address...',
        phone: 'your phone...',
        firm: 'firm...',
        password: 'password...',
        rPassword: 'repead password'
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
            back();
        }
    }

    const back = () => {
        setMenu({type: 'setMenu', payload: 'login'});
    }

    return(
        <div>
            <div className='w3-container'>
                <div className='w3-left' >Registration: </div>
                <img src={backIcon} className="w3-right" alt="back to Login In menu" onClick={back} />
            </div>
            <div>
                <form onSubmit={(event) => submitHandler(event)}>
                    {Object.keys(user).map((key) => inputer(key))}
                    <input type='radio' value='Consumer' name='type' defaultChecked/>
                    <label>I am Consumer - I have junk to dispouse</label> <br />
                    <input type='radio' value='Provider' name='type' /> 
                    <label>I am Provider - I will dispouse yours junk</label><br />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    );
};

export default Register;