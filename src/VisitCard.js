import React, {useState} from "react";
import clouseIcon  from './cancel_black.svg';

const VisitCard = ({visitCardOn, setVisitCardOn, company}) => {

    //Dlaczego to nie dziala?!!??!
    const handler = () => {
        console.log("handler X")
        setVisitCardOn("none");
    }

    return (
        <div 
            className={`w3-display-container w3-card w3-teal ${visitCardOn === company.email ? `w3-show` : `w3-hide`} w3-display-middle`} 
            style={{width: `90%`, position: `absolute`}} 
        >
            <div className="w3-display-topright" onClick={() => handler()} ><img src={clouseIcon} /></div>
            <p>Company name: {company.name}</p>
            <p>email: {company.email}</p>
            <p>phone: {company.tel}</p>
            <p>distance: {company.distance}</p>
            <p>address: {company.address}</p>
        </div>
    );
};

export default VisitCard;