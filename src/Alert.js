/*
set alert do not work!
*/
import React, {useState} from 'react';
import clouseIcon  from './cancel_black_24dp.svg';

const Alert = ({message, displayAlert, setAlert}) => {

    return (
        <div className={`w3-panel w3-red w3-display-middle w3-round ${displayAlert}`}>
            <div>
                <h3>ALERT!</h3>
                <img 
                        src={clouseIcon} 
                        onClick={() => setAlert(`w3-hide`)} 
                        className={`w3-right w3-cell-top `}
                        alt="delete Alert" 
                    />
            </div>
            {message !== null ? <div>{message}</div> : <div>No Message to display...</div> }
        </div>
    )
}

export default Alert;