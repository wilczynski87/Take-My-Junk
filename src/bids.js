/*
- add additional field -> professional details -> company / name in Backed
*/
import React, { useState, useContext, useEffect } from 'react';
import VisitCard from './VisitCard';
import { UserContext } from './context';

// const url = `http://localhost:8081/getProfessionalId/`;

const Bids = ({bidBody}) => {
    const [name, setName] = useState(`Bidder details`);
    const [visitCardOn, setVisitCardOn] = useState("none");
    const [context, setContext] = useContext(UserContext);

    const url = context.url + 'getProfessionalId/';

    const handler = (em) => {
        setVisitCardOn(em);
    }

    const comapny = {
        name: bidBody.profFirm,
        email: 'email@email.com'
    };

    useEffect( async () => {
        let myUrl = url + bidBody.f_key_professional_id;
    });

    return (
        <div className='w3-container' >
            <VisitCard 
                visitCardOn={visitCardOn}
                setVisitCardOn = {handler}
                company={comapny}
            />
            <div onClick={() => setVisitCardOn(comapny.email)}>
                <div className='w3-left'>{bidBody.id}#</div>
                <div className='w3-center'>{bidBody.profFirm}</div>
                <div className='w3-right'>{bidBody.price}</div>
            </div>
        </div>
    )
}

export default Bids;