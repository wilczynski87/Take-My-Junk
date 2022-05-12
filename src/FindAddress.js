import React, { useState } from "react";
import close from './cancel_black.svg';
import ContextProv from "./context";

const url = `https://geocode.search.hereapi.com/v1/geocode?q=`;

const FindAddress = ({setAddressLable, clickToggler}) => {

    const [address, setAddress] = useState({
        street: `Hardwick Road East`,
        number: `9`,
        town: `Worksop`,
        postcode: `S80 2NS`,
        label: null
    });

    const [position, setPosition] = useState({});

    const inputer = (event) => {
        setAddress({
            ...address,
            [event.target.name] : event.target.value
        })
    };
    const mapper = (key) => {
        return (
            <div key={key}>
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

        const getAddress = async () => {
            //url builder
            const formattedStreet = address.street.trim().replaceAll(` `, `+`);
            const formattedPostcode = address.postcode.trim().replaceAll(` `, `+`);
            const formattedTown = address.town.trim().replaceAll(` `, `+`);
            const apiKey = `&apiKey=yB5iOTA4o3635YX5sA1Dbch7oL6uo0yB5Lr1Akke_-M`;

            const urlBilder = `${url}${formattedStreet}+${address.number}%2C+${formattedPostcode}+${formattedTown}${apiKey}`;
            // console.log(urlBilder);

            //header builder
            
            //fetch
            const rawResponse = await fetch(urlBilder);
            // console.log(rawResponse);

            //after fetch
            if(rawResponse.ok) {
                const response = await rawResponse.json();
                console.log(response);
                // console.log(response.items[0].access[0]);
                setPosition({
                    ...response.items[0].access[0]
                });
                setAddress({
                    street: response.items[0].address.street,
                    number: response.items[0].address.houseNumber,
                    town: response.items[0].address.city,
                    postcode: response.items[0].address.postalCode,
                    label: response.items[0].address.label
                });
            } else {
                console.log(`Fetch went wrong.... status code not ok`);
            }
        };
        getAddress().catch(
            console.log(`Getting address went wrong...`)
        );
        console.log(position);

        
        // await -> your address? + map
        // if yes -> clouse and save to Context
        // if no -> clouse address handler
    }
    
    const correctAddress = (e) => {
        e.preventDefault();
        // setAddressLable();
        //here shoud be a context set with proper address 
        //including lat lng
        clickToggler();
    };

    return (
        <div className="w3-card w3-panel w3-teal w3-center">
            <div>
                Find Address: 
                <div className="w3-right"><img src={close} onClick={() => clickToggler()} /></div>
            </div>
            <form>
                {Object.keys(address).filter(key => key === `label` ? null : key).map(key => mapper(key))}
                <input 
                    type='submit'
                    value='Find address'
                    onClick={(e) => addressHandler(e)}
                />
            </form>
            <div>
            {address.label !== null ? 
            <div>Is this your address? {address.label} <button className="w3-button" onClick={(e) => correctAddress(e)}>Yes</button></div> 
            : null}
            </div>

        </div>
    );
};

export default FindAddress;