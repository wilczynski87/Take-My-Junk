import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context';
import Auction from './auction';
import MenuPanel from './menu';

const auctionsURL = `http://localhost:8081/getAuctionsByConsumerId/`;

const Main = () => {
    const [auctions, setAuctions] = useState([]);
    const [clicked, setClicked] = useState(null);
    const [context, setContext] = useContext(UserContext);

    //what to show when no auctions to display?
    const setAuc = (auct) => {
        if(auctions === []) {
            return <div>auctions</div>;
        } else {
            return auctions.map((auction, index) =><Auction key={index} body={auction} index={index} /> );
        }
    }

    const firstName = (name) => {
        return name.split(` `).shift();
    }

    useEffect( () => {
        //url builder
        const myUrl = auctionsURL + context.user.id;

        //fetch builder
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const fetchFunction = async () => {
            const auctionByCustomer = await fetch(myUrl, {
                method: 'GET',
                headers: header
            });
            const auctionJSON = await auctionByCustomer.json();
            setContext({type: 'setAuctions', payload: auctionJSON});
        }

        //fetch
        fetchFunction();

    },[]);

    const show = () => {
        clicked ===`w3-hide` || null ? setClicked(`w3-show`) : setClicked(`w3-hide`);
        if(clicked === null) setAuctions(context.auctions);
    }

    return (
        <div className=''>
            <div className='w3-panel'>
                <div className='w3-left'>Hello {firstName(context.user.fullName)}</div> 
                <div className='w3-right'><MenuPanel /> </div> 
            </div> <br />
            <div className="w3-container">
                <div className={`w3-left`} onClick={() => show()}> Active Auctions </div>
            </div>
            <div className={`${clicked}`}> {setAuc(auctions)} </div> <br />
            <div className='w3-card-4'>Ended Auctions</div>
        </div>
)};

export default Main;