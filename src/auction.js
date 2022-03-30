import React, { useState, useContext } from 'react';
import Bids from './bids';

const Auction = ({body}) => {
    const [bids, setBids] = useState("No Bids :-( ")

    const getBids = async () => {
        const response = await fetch('http://localhost:4000/user1');
        if(response.status === 200) {
            const jsonResponse = await response.json();
            const bidy = jsonResponse["auctions"][body.id - 1]["bids"];
            console.log(bidy);
            setBids(bidy);
        } else {
            console.log("I have problem with fetch?!");
        }
    }

    const displayBids = (bidsy) => {
        if(bidsy === "No Bids :-( ") {
            console.log(bidsy)
        } else {
            return bidsy.map( (bid) => <Bids key = {bid.id} bidBody = {bid} /> )
        }
    }

    return (
        <div>
            <button onClick={getBids}>{`${body.id}#    ${body.auctionOwner} - Auction owner`}</button> <br />
            {displayBids(bids)}
        </div>
    )
}
export default Auction;