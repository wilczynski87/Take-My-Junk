import React, { useState } from 'react';
import MenuPanel from './menu';

const CreateAuction = () => {

    const [myForm, setForm] = useState({
        title: 'meaningfull title...',
        junkType: 'junk type...',
        volume: 'how much junk in m3',
        containerType: 'container type...', 
        containerNumber: 'number of containers...',
        startDate: 'when to deliver container?',
        endDate: 'when to pick up an container?', 
        address: 'where to deliver an container?',
        notes: 'notes...'
    });

    const submitHandler = event => {
        event.preventDefault();
        let dataToSend = JSON.stringify({myForm});
        console.log("Data to send " + dataToSend);
    }

    const myLabel = (key) => {
        return (
            <div key={key}> 
                <label for={key}>{`${key}:`}</label> <br />
                        <input 
                            type="text" 
                            id={key} 
                            name={key}
                            value = {myForm[key]}
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
            <div className='w3-display-container'> 
                <div className='w3-row'>Create Auction</div> 
                <div className='w3-row w3-right'><MenuPanel /> </div>
            </div> <br />
            <form>
            {
                Object.keys(myForm).map(
                    (mykey) => myLabel(mykey) 
                )
            }
            </form>
            <button className='w3-right'>submit</button>
        </div>
    );
}

export default CreateAuction;