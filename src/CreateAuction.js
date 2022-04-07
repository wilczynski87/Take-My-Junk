/* TO DO:
- fetch w tworzeniau auckji
*/
import React, { useState, useContext } from 'react';
import MenuPanel from './menu';
import { UserContext } from './context';

const CreateAuction = () => {

    const [menu, setMenu] = useContext(UserContext);

    const [myForm, setForm] = useState({
        title: 'meaningfull title...',
        junkType: 'junk type...',
        volume: 'how much junk in m3',
        containerType: 'container type...', 
        containerNumber: 'number of containers...',
        startDate: '',
        endDate: '', 
        address: 'where to deliver an container?',
        notes: 'notes...'
    });

    const submitHandler = event => {
        event.preventDefault();
        let dataToSend = JSON.stringify({myForm});
        console.log("Data to send " + dataToSend);
        setMenu({type: 'setMenu', payload: 'main'});
    }

    const nameValidator = (name) => {
        switch(name) {
            case 'junkType':
                return 'Junk Type: ';
            case 'containerType':
                return 'Container Type: ';
            case 'containerNumber':
                return 'Container Number: ';
            case 'startDate':
                return 'Start Date: ';
            case 'endDate':
                return 'End Date: ';
            default: 
                name = name.split("");
                name[0] = name[0].toUpperCase();
                name = name.join("") + ": ";
                return name;
        }
    }

    const typeValidator = (type) => {
        switch(type) {
            case 'startDate':
                return 'date';
            case 'endDate':
                return 'date'
            default:
                return 'text';
        }
    }

    const myLabel = (key) => {
        return (
            <div key={key}> 
                <label for={key}>{nameValidator(key)}</label> <br />
                        <input 
                            type={typeValidator(key)} 
                            id={key} 
                            name={key}
                            value = {myForm[key]}
                            onClick = {() => setForm(myForm => (
                                {
                                    ...myForm, 
                                    [key]: ""
                                }
                            ))}
                            onChange = {event => setForm(myForm => (
                                {
                                    ...myForm, 
                                    [key]: event.target.value
                                }
                            ))}
                        /> <br />
            </div>
        );
    }

    return(
        <div>
            <div className='w3-panel w3-border'> 
                <div className='w3-left w3-border'>Create Auction</div> 
                <div className='w3-right w3-border'><MenuPanel /> </div>
            </div> <br />
            <form onSubmit={event => submitHandler(event)}>
            {
                Object.keys(myForm).map(
                    (mykey) => myLabel(mykey) 
                )
            }
            <input type="submit" className='w3-right' value='submit' />
            </form>
        </div>
    );
}

export default CreateAuction;