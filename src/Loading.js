import React from 'react';
import logo from './logo.svg';

const Loading = () => {
    return(
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div>
            Take My Junk App!
            </div>
            <div>
            Progress bar
            </div>
            <div>
            Loading...
            </div>
        </div>
    )
};

export default Loading;