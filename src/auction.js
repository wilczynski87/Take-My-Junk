import React, { useContext } from 'react';

const Auction = ({body}) => {

    return(
        <>
        <p>{`${body.id}#    ${body.auctionOwner} - Auction owner`}</p>
        </>
    )
}
export default Auction;