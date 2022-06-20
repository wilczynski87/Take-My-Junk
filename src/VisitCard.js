import React, {useState} from "react";
import clouseIcon  from './cancel_black.svg';

const VisitCard = ({visitCardOn, setVisitCardOn, company}) => {

    return (
        <div 
            className={`w3-display-container w3-card-4 w3-teal ${visitCardOn === company.email ? `w3-show` : `w3-hide`} w3-display-middle`} 
            style={{width: `90%`, position: `absolute`, zIndex: '10000'}} 
        >
            <div className="w3-display-topright" onClick={() => setVisitCardOn("none")} ><img src={clouseIcon} /></div>
            <p>Company name: {company.name}</p>
            <p>email: {company.email}</p>
            <p>phone: {company.tel}</p>
            <p>distance: {company.distance}</p>
            <p>address: {company.address}</p>
        </div>
    );
};

export default VisitCard;