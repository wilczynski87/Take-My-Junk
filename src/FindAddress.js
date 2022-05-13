import React, { useEffect, useState } from "react";
import close from './cancel_black.svg';
import ContextProv from "./context";

const url = `https://geocode.search.hereapi.com/v1/geocode?q=`;
const urlReverse = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=`;

const FindAddress = ({setAddressLable, clickToggler}) => {

    const [address, setAddress] = useState({
        street: `Hardwick Road East`,
        number: `9`,
        town: `Worksop`,
        postcode: `S80 2NS`,
        label: null,
        lat: 0,
        lng: 0
    });

    const [position, setPosition] = useState({});

    useEffect(() => {
        //finding current address
        currentAddress();
    },[]);

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

        //Map api calling for address from provided geocoded address
        const getAddress = async () => {
            //url builder
            const formattedStreet = address.street.trim().replaceAll(` `, `+`);
            const formattedPostcode = address.postcode.trim().replaceAll(` `, `+`);
            const formattedTown = address.town.trim().replaceAll(` `, `+`);
            const apiKey = `&apiKey=yB5iOTA4o3635YX5sA1Dbch7oL6uo0yB5Lr1Akke_-M`;

            const urlBilder = `${url}${formattedStreet}+${address.number}%2C+${formattedPostcode}+${formattedTown}${apiKey}`;
            // console.log(urlBilder);

            //fetch
            const rawResponse = await fetch(urlBilder);
            // console.log(rawResponse);

            //after fetch
            if(rawResponse.ok) {
                const response = await rawResponse.json();
                setAddress({
                    street: response.items[0].address.street,
                    number: response.items[0].address.houseNumber,
                    town: response.items[0].address.city,
                    postcode: response.items[0].address.postalCode,
                    label: response.items[0].address.label,
                    lat: response.items[0].access[0].lat,
                    lng: response.items[0].access[0].lng,
                });
            } else {
                console.log(`Fetch went wrong.... status code not ok`);
            }
        };

        getAddress().catch(
            console.log(`Getting address went wrong...`)
        );
        console.log(position);

    }

    const currentAddress = () => {

        const getAddressRev = async (lat, lng) => {
            //url builder
            const apiKey = `&apiKey=yB5iOTA4o3635YX5sA1Dbch7oL6uo0yB5Lr1Akke_-M`;

            const urlBilder = `${urlReverse}${lat}%2C${lng}${`&lang=en-US`}${apiKey}`;
            // console.log(urlBilder);

            //fetch
            const rawResponse = await fetch(urlBilder);
            // console.log(rawResponse);

            //after fetch
            if(rawResponse.ok) {
                const response = await rawResponse.json();
                //console.log(response);

                //putting address into status
                setAddress({
                    street: response.items[0].address.street,
                    number: response.items[0].address.houseNumber,
                    town: response.items[0].address.city,
                    postcode: response.items[0].address.postalCode,
                    label: response.items[0].address.label
                });

            } else {
                console.log(`Getting address went wrong...`);
            };
        };

        const success = (position) => {
            const lat  = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log(lat + " " + lng);

            //finding address baised on lat and lng
            getAddressRev(lat, lng);
        }

        const error = () => {
            console.log(`Could not get a position :-( `)
        }

        if(!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }

    };
    
    const correctAddress = (e) => {
        e.preventDefault();
        
        // setAddressLable({address});
        clickToggler();
    };

    return (
        <div className="w3-card w3-panel w3-teal w3-center">
            <div>
                Find Address: 
                <div className="w3-right"><img src={close} onClick={() => clickToggler()} /></div>
            </div>
            <form>
                {Object.keys(address)
                    .filter(key => key === `label` ? null : key)
                    .filter(key => key === `lat` ? null : key)
                    .filter(key => key === `lng` ? null : key)
                    .map(key => mapper(key))}
                <input 
                    type='submit'
                    value='Find address'
                    onClick={(e) => addressHandler(e)}
                />
            </form>
            <div>
            {address.label !== null ? 
                <div>Is this your address? <br /> <p>{address.label} </p>
                    <button 
                        className="w3-card w3-btn w3-border w3-border-green w3-round-xlarge" 
                        onClick={(e) => correctAddress(e)}
                        value='Yes'
                    >Yes
                    </button>
                </div> 
            : null}
            </div>

        </div>
    );
};

export default FindAddress;