/*
- add additional field -> professional details -> company / name in Backed
*/
import React, { useState, useContext, useEffect } from 'react';
import VisitCard from './VisitCard';

const url = `http://localhost:8081/getProfessionalId/`;

const Bids = ({bidBody}) => {
    const [name, setName] = useState(`Bidder details`)
    const [visitCardOn, setVisitCardOn] = useState("none")

    const comapny = {
        name: bidBody.profFirm,
        email: 'email@email.com'
    };

    useEffect( async () => {
        let myUrl = url + bidBody.f_key_professional_id;
    });

    return (
        <div className='w3-container' onClick={() => setVisitCardOn(comapny.email)}>
            <VisitCard 
                visitCardOn={visitCardOn}
                setVisitCardOn = {setVisitCardOn}
                company={comapny}
            />
            <div className='w3-left'>{bidBody.id}#</div>
            <div className='w3-center'>{bidBody.profFirm}</div>
            <div className='w3-right'>{bidBody.price}</div>
        </div>
    )
}

export default Bids;