import React, {} from 'react';
import SyncIcon from './sync.svg';

const FetchLoading = ({message}) => {

    return (
        <div className={`w3-container w3-card w3-green w3-display-middle w3-round spinner-container`} >
            <div>{message === null ? <h3>Loading...</h3> : <h3>{message}</h3>}</div>
            <div className=''><img className='loading-spinner' src={SyncIcon} /></div>
        </div>
    )
}

export default FetchLoading;