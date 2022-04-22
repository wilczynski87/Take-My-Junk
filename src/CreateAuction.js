/* TO DO:
- fetch w tworzeniau auckji
- daty -> utowrzyć bazowo datę dzisiejszą
- daty -> bazowo termin +7 dni
*/
import React, { useState, useContext } from 'react';
import MenuPanel from './menu';
import { UserContext } from './context';

const url = "http://localhost:8081/createAuction/";

const CreateAuction = () => {

    const [context, setMenu] = useContext(UserContext);

    const timeCreator = (plus) => {
        const today = new Date();
        const day = (today.getDate() + plus) < 10 ? `0${(today.getDate() + plus)}` : (today.getDate() + plus);
        const month = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1);
        const year = today.getFullYear();
        const startD = year + '-' + month + '-' + day;
        return startD;
    }

    const [myForm, setForm] = useState({
        title: 'meaningfull title...',
        junkType: 'junk type...',
        volume: 0,
        containerType: 'container type...', 
        containerNumber: 0,
        startDate: timeCreator(0),
        endDate:  timeCreator(10), 
        address: 'where to deliver an container?',
        notes: 'notes...',
        //whoCreated: context.user.id
    });

    const submitHandler = async event => {
        event.preventDefault();

        // const myId = myForm.whoCreated;
        const myId = context.user.id;

        //url builder
        let urlId = url + myId;
        // console.log(urlId);

        //fetch builder
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(myForm); //let dataToSend = JSON.stringify({myForm});
        console.log(myForm);

        //fetch
        const response = await fetch( urlId,
            {
                method: 'POST',
                headers: headers,
                body: body
            }
        );
        const responseJSON = await response.json();
        console.log(responseJSON);

        //after fetch
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
            case 'containerNumber':
                return 'number';
            case 'volume':
                return 'number';
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
                Object.keys(myForm)
                    .filter((key) => key != 'whoCreated')
                    .map( (mykey) => myLabel(mykey) )
            }
            <input type="submit" className='w3-right' value='submit' />
            </form>
        </div>
    );
}

export default CreateAuction;