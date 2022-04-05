import React, { useState, useContext } from 'react';
import Bids from './bids';
import deleteIcon from './cancel_black_24dp.svg';

const Auction = ({body}) => {
    const [bids, setBids] = useState("No offers yet...");
    const [click, setClick] = useState(null);

    const displayBids = (bidsy) => {
        if(bidsy === "No offers yet...") {
            setBids(body.bids);
            return (
                bids === null ? <div>No offers yet...</div> : <div>{bidsy[bidsy.size-1]}</div>
            );
        } else {
            return bidsy.map( (bid) => <Bids key = {bid.id} bidBody = {bid} /> )
        }
    }

    const show = (clicked) => {
        clicked ===` w3-hide` || null ? setClick(` w3-show`) : setClick(` w3-hide`);
        //if(clicked === null) setBids(body.bids);
    }

    const deleteAuction = () => {
        
    }

    return (
        <div className='w3-panel w3-card-4'>
            <div className='w3-cell-row w3-left'>
                <div onClick={() => show(click)}>
                    <div className='w3-left w3-cell-top' >{body.id}#</div>
                    <div className='w3-center w3-cell-top'>{body.title}</div>
                    <div className=''>{body.auctionStart}</div>
                </div>
                <img src={deleteIcon} onClick={null} className='w3-right w3-cell-top' alt="delete Auction" />
            </div> <br />
            <div className={`${click}`}>
                {displayBids(bids)}
            </div>
        </div>
    )
}
export default Auction;