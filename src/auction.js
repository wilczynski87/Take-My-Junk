import React, { useState, useContext } from 'react';
import Bids from './bids';

const Auction = ({body}) => {
    const [bids, setBids] = useState("No Bids :-( ");

    const displayBids = (bidsy) => {
        if(bidsy === "No Bids :-( ") {
            //console.log(bidsy)
        } else {
            return bidsy.map( (bid) => <Bids key = {bid.id} bidBody = {bid} /> )
        }
    }

    return (
        <div>
            <button onClick={() => setBids(body.bids)}>{`${body.id}#    ${body.auctionOwner} - Auction owner`}</button> <br />
            {displayBids(bids)}
        </div>
    )
}
export default Auction;