import React, { useState, useContext, useEffect } from 'react';

const url = `http://localhost:8081/getProfessionalId/`;

const Bids = ({bidBody}) => {
    const [name, setName] = useState(`Bidder details`)

    useEffect( async () => {
        let myUrl = url + bidBody.f_key_professional_id;
        // const name = await fetch(myUrl);
        // const nameJSON = await name.json();
        // setName(nameJSON);
    });

    return (
        <div className='w3-container'>
            <div className='w3-left'>{bidBody.id}#</div>
            <div className='w3-center'>{name}</div>
            <div className='w3-right'>{bidBody.price}</div>
        </div>
    )
}

export default Bids;