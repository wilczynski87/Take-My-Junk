import React, { useState, useContext } from 'react';
import UserContext from './context';
import Auction from './auction';

const auctions1 = [
    {
        "id": 1,
        "date": "01/01/2022",
        "auctionOwner": "user1",
        "bids": [
            {
                "whoBid": "provider1",
                "price": 900,
                "date": "02/01/2022"
            },
            {
                "whoBid": "provider2",
                "price": 100,
                "date": "02/01/2022"
            }
        ]
    },
    {
        "id": 2,
        "date": "15/05/2022",
        "auctionOwner": "user1",
        "bids": [
            {
                "whoBid": "provider2",
                "price": 900,
                "date": "02/01/2022"
            },
        ]
    }
]
    

const Main = () => {
    const [auctions, setAuctions] = useState("dupa zbita");
    const user = useContext(UserContext);
    // console.log(user);

    const getActiveAuction = async () => {
        // const response = await fetch("http://localhost:4000/user1");
        const response = await fetch("http://localhost:3306/")
        if(response.status === 200) {
            const auc = await response.json();
            setAuctions(auc["auctions"]);
        } else {
            console.log("I can not get 200 as response");
        }
    }

    const fetchBuilder = (myUser, myPassword) => {
        const rawUrl = "http://localhost:4000/";
        return "" + rawUrl + myUser + "/" + myPassword;
    }

    const setAuc = (auc) => {
        if(auc === "dupa zbita") {
            console.log("no auction to display!");
        } else {
            return auc.map((auction) => <Auction key={auction.id} body={auction} />);
        }
    }


    return (
        <div>
            <p>Hello {user["email"]}</p>
            <button onClick={getActiveAuction}>Active Auctions</button> <br />
            {setAuc(auctions)}
            <button>Ended Auctions</button>
        </div>
)};

export default Main;