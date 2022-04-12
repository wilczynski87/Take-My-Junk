import React, { useState, useContext } from 'react';
import Bids from './bids';
import deleteIcon from './cancel_black_24dp.svg';
import { UserContext } from './context';

const url = "http://localhost:8081/deleteAuction/";

const Auction = ({body, index}) => {
    const [bids, setBids] = useState("No offers yet...");
    const [click, setClick] = useState(null);
    const [context, setContext] = useContext(UserContext);

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

    const deleteAuction = async () => {
        console.log("delete auction start");
        //url builder
        const auctionId = body.id;
        const myUrl = url + auctionId;
        console.log(myUrl);

        //fetch builder
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        //fetch
        const response = await fetch(myUrl, 
            {
                method: 'DELETE',
                headers: header
            });
        const responseJSON = await response.json();

        //after fetch
        console.log(context.auctions[index]);
        let auctions = context.auctions;
        auctions.splice(index, 1);
        setContext({type: 'deleteAuction', payload: auctions});
    };

    return (
        <div className='w3-panel w3-card-4'>
            <div className='w3-cell-row w3-left'>
                <div onClick={() => show(click)}>
                    <div className='w3-left w3-cell-top' >{body.id}#</div>
                    <div className='w3-center w3-cell-top'>{body.title}</div>
                    <div className=''>{body.auctionStart}</div>
                </div>
                <div>
                <img 
                    src={deleteIcon} onClick={() => deleteAuction()} className='w3-right w3-cell-top' alt="delete Auction" />
                </div>
            </div> <br />
            <div className={`${click}`}>
                {displayBids(bids)}
            </div>
        </div>
    )
}
export default Auction;