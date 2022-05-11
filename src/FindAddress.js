import React, { useState } from "react";
import close from './cancel_black.svg';
import ContextProv from "./context";

const FindAddress = ({setAddressLable, clickToggler}) => {

    const [address, setAddress] = useState({
        street: ``,
        number: ``,
        town: ``,
        postcode: ``
    });

    const inputer = (event) => {
        setAddress({
            ...address,
            [event.target.name] : event.target.value
        })
    };
    const mapper = (key) => {
        return (
            <div>
            <label>{key}</label>
            <input 
                type='text'
                value={address[key]}
                name={key}
                onChange={(event) => inputer(event)}
            />
            </div>
        )
    }

    const addressHandler = (e) => {
        e.preventDefault();

        // await -> your address? + map
        // if yes -> clouse and save to Context
        // if no -> clouse address handler
    }
    

    return (
        <div className="w3-card w3-panel w3-teal w3-center">
            <div>
                Find Address: 
                <div className="w3-right"><img src={close} onClick={() => clickToggler()} /></div>
            </div>
            <form>
                {Object.keys(address).map(key => mapper(key))}
                <input 
                    type='submit'
                    value='Find address'
                    onClick={(e) => addressHandler(e)}
                />
            </form>

        </div>
    );
};

export default FindAddress;