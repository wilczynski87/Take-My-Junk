import React, { useState, useContext } from 'react';

const Bids = ({bidBody}) => {

    return (
        <div className='w3-container'>
            {`${bidBody.id}#, who bid: ${bidBody.whoBid}, price: ${bidBody.price}`}
        </div>
    )
}

export default Bids;