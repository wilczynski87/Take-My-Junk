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
        <div className='w3-panel w3-card-4'>
            <div onClick={() => setBids(body.bids)}>
                <div>
                    <div className='w3-left'>{body.id}#</div>
                    <div className='w3-center'>{body.title}</div>
                    <div className='w3-right'>{body.auctionStart}</div>
                </div>
                <div></div>
            </div> <br />
            {displayBids(bids)}
        </div>
    )
}
export default Auction;