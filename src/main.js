import React, { useState, useContext } from 'react';
import { UserContext } from './context';
import Auction from './auction';

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


    return (
        <div>
            <p>Hello {context.user.email}</p>
            <button onClick={() => setAuctions(context.user.auctions)}>Active Auctions</button> <br />
            {setAuc(auctions)}
            <button>Ended Auctions</button>
        </div>
)};

export default Main;