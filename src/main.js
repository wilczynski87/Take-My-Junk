import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context';
import Auction from './auction';
import MenuPanel from './menu';
import Professional from './Professional';

const auctionsURL = `http://localhost:8081/getAuctionsByConsumerId/`;

const Main = () => {
    const [auctions, setAuctions] = useState([]);
    const [auctionsEnd, setAuctionsEnd] = useState([]);
    const [clicked, setClicked] = useState(null);
    const [clickedEnd, setClickedEnd] = useState(null);
    const [context, setContext] = useContext(UserContext);

    const profShow = () => {
        return `licenseNo` in context.user ? `w3-show` : `w3-hide`;
    }

    //what to show when no auctioreturn `licenseNo` in context.user ?ns to display?
    const setAuc = () => {
        if(clicked === `w3-show` && auctions.length < 1 ) {
            return <div>No auctions to display :-( </div>;
        } else {
            return auctions.map((auction, index) =><Auction key={index} body={auction} index={index} /> );
        }
    }

    const setAucEnd = () => {
        if(clickedEnd === `w3-show` && auctionsEnd.length < 1 ) {
            return <div>No auctions to display :-(</div>;
        } else {
            return null;
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
            if(auctionByCustomer.ok) {
                const auctionJSON = await auctionByCustomer.json();
                await setContext({type: 'setAuctions', payload: auctionJSON});
            } else console.log(`Server problem ${auctionByCustomer.status}`)
        }

        //fetch
        fetchFunction();

        //after fetch

    },[]);

    const show = () => {
        if(clicked === null) {
            setAuctions(context.auctions);
            setClicked(`w3-show`);
        } else if(clicked === `w3-hide`) {
            setClicked(`w3-show`);
        } else setClicked(`w3-hide`);
    }

    const showEnd = () => {
        if(clickedEnd === null) {
            //setAuctionsEnd(context.auctionsEnd);
            setClickedEnd(`w3-show`);
        } else if(clickedEnd === `w3-hide`) {
            setClickedEnd(`w3-show`);
        } else setClickedEnd(`w3-hide`);
    }

    return (
        <div className=''>
            <div className='w3-panel'>
                <div className='w3-left'>Hello {firstName(context.user.fullName)}</div> 
                <div className='w3-right'><MenuPanel /> </div> 
            </div> <br />
            <div className="w3-container">
                <div className={`w3-left`} onClick={() => show()}> Active Auctions </div> <br />
                <div className={`${clicked}`}> {setAuc()} </div>
            </div>
            <br />

            <div className="w3-container">
                <div className='w3-left' onClick={() => showEnd()}>Ended Auctions</div> <br />
                <div className={`${clickedEnd}`}> {setAucEnd()} </div>
            </div>
            <br />

            <div className={`w3-container ${profShow()}`} >
                    <div className='w3-left' onClick={() => setContext({type: 'setMenu', payload: 'professional'})} >Professional Menu</div> <br />
            </div>
        </div>
)};

export default Main;