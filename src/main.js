import React, { useState, useContext, useEffect} from 'react';
import { UserContext } from './context';
import Auction from './auction';
import MenuPanel from './menu';
import MapAndProf from './MapAndProf';
import ExpiredAuctions from './ExpiredAuctions';

const Main = () => {
    const [auctions, setAuctions] = useState([]);
    const [auctionsEnd, setAuctionsEnd] = useState([]);
    const [clicked, setClicked] = useState(null);
    const [clickedEnd, setClickedEnd] = useState(null);
    const [showFindProf, setShowFindProf] = useState(`w3-show`);
    
    const [context, setContext] = useContext(UserContext);

    const auctionsURL = context.url + `getAuctionsByUserId/`;

    const profShow = () => {
        return `licenseNo` in context.user ? `w3-show` : `w3-hide`;
    }

    //what to show when no auctioreturn `licenseNo` in context.user ?ns to display?
    const setAuc = () => {
        if(clicked === `w3-show` && auctions.length < 1 ) {
            return <div>No auctions to display :-( </div>;
        } else {
            return auctions.map((auction, index, key) => <Auction index={index} body={auction} key={auction.id} /> );
        }
    }

    const setAucEnd = () => {
        if(clickedEnd === `w3-show` && auctionsEnd.length < 1) {
            return <div>No auctions to display :-(</div>;
        } else {
            return <ExpiredAuctions auctionsEnd={auctionsEnd} />;
        }
    }

    const firstName = (name) => {
        return name.split(` `).shift();
    }

    useEffect(() => {
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
        };

        //fetch
        fetchFunction();

        //after fetch

    },[]);

    const show = () => {
        if(clicked === null) {
            const auctionsValid = context.auctions.filter(auction => !auction.expired);
            setAuctions(auctionsValid);
            setClicked(`w3-show`);
        } else if(clicked === `w3-hide`) {
            setClicked(`w3-show`);
        } else setClicked(`w3-hide`);
    }

    const showEnd = () => {
        if(clickedEnd === null) {
            const auctionsValid = context.auctions.filter(auction => auction.expired);
            setAuctionsEnd(auctionsValid);
            setClickedEnd(`w3-show`);
        } else if(clickedEnd === `w3-hide`) {
            setClickedEnd(`w3-show`);
        } else setClickedEnd(`w3-hide`);
    }

    const showProf = () => {
        if(showFindProf === null) {
            setShowFindProf(`w3-show`);
        } else if(showFindProf === `w3-hide`) {
            setShowFindProf(`w3-show`);
        } else setShowFindProf(`w3-hide`);
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
                <div className={`w3-left`} onClick={() => showProf()}> Find Skip Company </div> <br />
                <div className={`${showFindProf}`}> <MapAndProf /> </div>
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