import React, { useState, useContext, useEffect, useReducer } from 'react';
import Bids from './bids';
import deleteIcon from './cancel_black.svg';
import MakeBid from './MakeBid';
import { UserContext } from './context';
import AuctionInfo from './AuctionInfo';
import info from './info.svg';

const url = "http://localhost:8081/deleteAuction/";

const Auction = ({body, index, refreshBid}) => {
    const [click, setClick] = useState(null);

    const [context, setContext] = useContext(UserContext);

    const [showInfo, setShowInfo] = useReducer((showInfo) => !showInfo ,false);

    const bidy = body.bids.sort((a, b) => b.price - a.price);

    const ownerPrivilage = () => {
        const ownerId = context.user.id;
        const auctionId = body.whoCreated;

        return ownerId === auctionId ? `w3-show` : `w3-hide`;
    }

    const professionalPrivilage = () => {
        const professioanl = `licenseNo` in context.user;
        return professioanl === true ? `w3-show` : `w3-hide`;
    }

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
            <AuctionInfo showInfo={showInfo} setShowInfo={setShowInfo} body={body} />
            <div className='w3-cell-row w3-left w3-display-container'>
                <img src={info} className='w3-display-topright' onClick={() => setShowInfo()}/>
                <div onClick={() => show()}>
                    <div className='w3-left w3-cell-top' >{body.id}#</div>
                    <div className='w3-center w3-cell-top'>{body.title}</div>
                    <div className=''>{body.auctionStart}</div>
                </div>
                <div>
                    <img 
                        src={deleteIcon} 
                        onClick={() => deleteAuction()} 
                        className={`w3-right w3-cell-top ${ownerPrivilage()}`}
                        alt="delete Auction" 
                    />
                </div>
            </div> <br />
            <div name="given bids" >
                {displayBids()}
            </div>
            <div name="Make a bid" className={professionalPrivilage()}>
                <MakeBid refreshBid={refreshBid} auctionBody={body} />
            </div>
        </div>
    )
}
export default Auction;