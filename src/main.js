import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context';
import Auction from './auction';
import MenuPanel from './menu';

const auctionsURL = `http://localhost:8081/getAuctionsByConsumerId/1`;

const Main = () => {
    const [auctions, setAuctions] = useState("dupa zbita");
    const [context, setUser] = useContext(UserContext);

    const fetchBuilder = (myUser, myPassword) => {
        const rawUrl = "http://localhost:4000/";
        return "" + rawUrl + myUser + "/" + myPassword;
    }

    const setAuc = (auc) => {
        if(auc === "dupa zbita") {
             //console.log("no auction to display!");
        } else {
            return auc.map((auction) => <Auction key={auction.id} body={auction} />);
        }
    }

    const firstName = (name) => {
        return name.split(` `).shift();
    }

    useEffect(async () => {
        const auctionByCustomer = await fetch(auctionsURL);
        const auctionJSON = await auctionByCustomer.json();
        console.log(auctionJSON);
        setUser({type: 'setAuctions', payload: auctionJSON});
    }, []);

    return (
        <div className=''>
            <div className='w3-panel'>Hello {firstName(context.user.fullName)} </div> <MenuPanel /><br />
            <div className='w3-card-4' onClick={() => setAuctions(context.auctions)}>
                Active Auctions
            {setAuc(auctions)}
            </div> <br />
            <div className='w3-card-4'>Ended Auctions</div>
        </div>
)};

export default Main;