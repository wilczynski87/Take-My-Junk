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

    const inputer = (key) => {
        return (
            <div key={key}> 
                <label for={key}>{`${key}:`}</label> <br />
                        <input 
                            type="text" 
                            id={key} 
                            name={key}
                            value = {user[key]}
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
                    
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    );
};

export default Register;