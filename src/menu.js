/*
- aukcje cza 2x kliknac?!
*/
import React, { useContext, useState } from 'react';
import { UserContext } from './context';
import menuIcon from './menu_black_24dp.svg';

const MenuPanel = () => {
    const [context, dispatch] = useContext(UserContext);

    const[ddmenu, setDdmenu] = useState(false);

    const wrapper = (menuName) => {
        if(menuName === `logout`) {
            dispatch({type: 'logOut', payload: null})
        } else {
            dispatch({type: 'setMenu', payload: menuName})
        }
    }

    const show = () => {
        ddmenu ? setDdmenu(false) : setDdmenu(true);
    }

    const showMenu = " w3-show";

    return (
        <div className ="w3-dropdown-click">
            <button onClick={show} className="w3-button "><img src={menuIcon} className="" alt="menu" /></button>
            <ul className={`w3-dropdown-content w3-bar-block w3-animate-zoom ${ddmenu ? showMenu : null}`}>
                <li href="#" className="w3-bar-item w3-button" onClick={() => wrapper('main')}>Main</li>
                <li href="#" className="w3-bar-item w3-button" onClick={() => wrapper('createAuction')}>Create Auction</li>
                <li href="#" className="w3-bar-item w3-button" onClick={() => wrapper('settings')}>Settings</li>
                <li href="#" className="w3-bar-item w3-button" onClick={() => wrapper('logout')}>Log out</li>
            </ul>
        </div>
    );
}

export default MenuPanel;