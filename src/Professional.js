import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context';
import MenuPanel from './menu';
import Auction from './auction';

const urlFiltered = `http://localhost:8081/getAuctionByFilers/`;
const urlBid = ``;

const Professional = () => {
    const [auctions, setAuctions] = useState([]);
    const [clicked, setClicked] = useState(`w3-hide`);
    const [context, setContext] = useContext(UserContext);
    const [bidRefresh, setBidRefresh] = useState(false);

    const refreshBid = () => {
        bidRefresh === false ?  setBidRefresh(true) :  setBidRefresh(false);
    }
    
    useEffect(() => {
        //url build
        const myUrlFiltered = urlFiltered + context.user.id;

        //fetch build
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const body = {
            junkType: null,
            distance: 0,
            startDate: null,
            endDate: null,
            auctionStarted: null,
            volume: 0,
            lowestBid: null,
        }

        //fetch
        const fetching = async () => {
            const response = await fetch(myUrlFiltered, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body),
            });
            if(response.ok) {
                const responseJson = await response.json();
                //console.log("response ok")
                // return responseJson;
                setAuctions(responseJson)
            } else {
                console.log(`Problem with request ${response.status}`);
            }
        }
        fetching();
        //after fetch
        console.log(bidRefresh);

    },[bidRefresh]);

    const displayHandler = () => {
        clicked === `w3-hide` ? setClicked(`w3-show`) : setClicked(`w3-hide`);
    }

    const displayAuctions = () => {
        if(auctions < 1) {
            return <div>No Auction avaliable</div>
        } else
        return (
        auctions.map((auction, index) => <Auction key={index} body={auction} index={index} refreshBid={refreshBid} />)
        );
    }

    return (
        <div>
            <div className='w3-panel w3-border'> 
                <div className='w3-left w3-border'>Professional Menu:</div> 
                <div className='w3-right w3-border'><MenuPanel /> </div>
            </div> <br />
            <div>My bids</div> <br />
            <div>
                <div onClick = {() => displayHandler()}>Auctions</div> <br />
                <div className={`${clicked}`}> {displayAuctions()} </div>
            </div>

        </div>
    );
}

export default Professional;