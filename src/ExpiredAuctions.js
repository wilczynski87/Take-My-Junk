import React, {useContext} from "react";
import { UserContext } from './context';
import Auction from './auction';

const ExpiredAuctions = ({auctionsEnd}) => {

    return(
        <div> 
            {
                auctionsEnd.map((auction, index) => {
                    return auction.expired ? 
                    <Auction index={index} body={auction} key={auction.id} /> :
                    null;
                    }
                )
            }
        </div>
    );
};

export default ExpiredAuctions;