import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context';
import Auction from './auction';
import MenuPanel from './menu';

const auctionsURL = `http://localhost:8081/getAuctionsByConsumerId/1`;

const Main = () => {
    const [auctions, setAuctions] = useState("No active auctions to display");
    const [clicked, setClicked] = useState(null);
    const [context, setContext] = useContext(UserContext);

    const setAuc = (auct) => {
        if(auct === "No active auctions to display") {
             return <div className='w3-center'>{clicked === ` w3-hide` ? auctions : null}</div>;
        } else {
            return auct.map((auction) =><Auction key={auction.id} body={auction} /> );
        }
    }

    const firstName = (name) => {
        return name.split(` `).shift();
    }

    useEffect(async () => {
        const auctionByCustomer = await fetch(auctionsURL);
        const auctionJSON = await auctionByCustomer.json();
        setContext({type: 'setAuctions', payload: auctionJSON});
    }, []);

    const show = (click) => {
        click ===` w3-hide` || null ? setClicked(` w3-show`) : setClicked(` w3-hide`);
        if(click === null) setAuctions(context.auctions);
    }

    return (
        <div className=''>
            <div className='w3-panel'>
                <div className='w3-left'>Hello {firstName(context.user.fullName)}</div> 
                <div className='w3-right'><MenuPanel /> </div> 
            </div> <br />
            <div className={`w3-container `} onClick={() => show(clicked)}> Active Auctions </div>
            <div className={`${clicked}`}> {setAuc(auctions)} </div> <br />
            <div className='w3-card-4'>Ended Auctions</div>
        </div>
)};

export default Main;