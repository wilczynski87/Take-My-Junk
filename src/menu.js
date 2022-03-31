import React, { useContext } from 'react';
import { UserContext } from './context';
import menuIcon from './menu_black_24dp.svg';

const MenuPanel = () => {
    const [context, dispatch] = useContext(UserContext);

    const wrapper = (menuName) => {
        if(menuName === `logout`) {
            dispatch({type: 'logOut', payload: null})
        } else {
            dispatch({type: 'setMenu', payload: menuName})
        }
    }

    return (
        <div className='w3-round-xxlarge w3-display-topright w3-panel w3-card w3-dropdown-hover'>
            <img src={menuIcon} className="w3-button" alt="menu" />
            <ul className="w3-dropdown-content w3-bar-block w3-card-4 ">
                <li className="w3-bar-item w3-button" onClick={null}>Settings</li>
                <li className="w3-bar-item w3-button" onClick={() => wrapper('main')}>Main</li>
                <li className="w3-bar-item w3-button" onClick={() => wrapper('logout')}>Log out</li>
            </ul>
        </div>
    );
}

export default MenuPanel;