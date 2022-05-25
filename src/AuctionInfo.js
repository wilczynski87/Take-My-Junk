import React, {useState } from "react";
import clouseIcon  from './cancel_black.svg';

const AuctionInfo = ({showInfo, setShowInfo, body}) => {

    const show = () => {
        return showInfo ? `w3-show` : `w3-hide`;
    }

    return(
        <div className={`w3-card-4 w3-panel w3-teal w3-display-middle w3-display-container ${show()}`}>
            <div><img src={clouseIcon} className='w3-display-topright' onClick={() => setShowInfo()} /></div>
            <div>
                Auction Info: <br />
                Title: {body.title} <br />
                Address: {body.address.label} <br />
                Waste type: {body.junkType} <br />
                Volume: {body.volume} <br />
                Auction Ends: {body.endDate} <br />
            </div>
        </div>
    );
};

export default AuctionInfo;