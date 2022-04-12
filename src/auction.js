import React, { useState, useContext, useEffect } from 'react';
import Bids from './bids';
import deleteIcon from './cancel_black_24dp.svg';
import { UserContext } from './context';

const url = "http://localhost:8081/deleteAuction/";

const Auction = ({body, index}) => {
    const [click, setClick] = useState(null);
    const [context, setContext] = useContext(UserContext);

    const bidy = body.bids;

    const displayBids = () => {
        if(bidy < 1) {
            return  <div>No offers yet...</div>;
        } else if(click === `w3-show` ){
            return bidy.map( (bid) => <Bids key = {bid.id} bidBody = {bid} /> );
        } else {
             return <Bids bidBody = {bidy[bidy.length-1]} />;
        }
    }

    const show = () => {
        if(click === `w3-hide` || click === null) {
            setClick(`w3-show`);
        } else setClick(`w3-hide`);
    }

    const deleteAuction = async () => {
        //url builder
        const auctionId = body.id;
        const myUrl = url + auctionId;

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
        let auctions = context.auctions;
        auctions.splice(index, 1);
        setContext({type: 'deleteAuction', payload: auctions});
    };

    return (
        <div className='w3-panel w3-card-4'>
            <div className='w3-cell-row w3-left'>
                <div onClick={() => show()}>
                    <div className='w3-left w3-cell-top' >{body.id}#</div>
                    <div className='w3-center w3-cell-top'>{body.title}</div>
                    <div className=''>{body.auctionStart}</div>
                </div>
                <div>
                <img 
                    src={deleteIcon} onClick={() => deleteAuction()} className='w3-right w3-cell-top' alt="delete Auction" />
                </div>
            </div> <br />
            <div >
                {displayBids()}
            </div>
        </div>
    )
}
export default Auction;