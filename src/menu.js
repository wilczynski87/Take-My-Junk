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
        // <div className='w3-round-xxlarge w3-display-topright w3-panel w3-card w3-dropdown-hover'>
        //     <img src={menuIcon} className="w3-button" alt="menu" />
        //     <ul className="w3-dropdown-content w3-bar-block w3-card-4 ">
        //         <li className="w3-bar-item w3-button" onClick={null}>Settings</li>
        //         <li className="w3-bar-item w3-button" onClick={() => wrapper('main')}>Main</li>
        //         <li className="w3-bar-item w3-button" onClick={() => wrapper('logout')}>Log out</li>
        //     </ul>
        // </div>
        <div className ="w3-dropdown-click w3-right">
            <button onClick={show} className="w3-button "><img src={menuIcon} className="" alt="menu" /></button>
            <div id="Demo" className={`w3-dropdown-content w3-bar-block w3-animate-zoom ${ddmenu ? showMenu : null}`}>
                <a href="#" className="w3-bar-item w3-button">Link 1</a>
                <a href="#" className="w3-bar-item w3-button">Link 2</a>
                <a href="#" className="w3-bar-item w3-button">Link 3</a>
            </div>
        </div>
    );
}

export default MenuPanel;