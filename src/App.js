import React, { useContext} from 'react';
import './App.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import { UserContext } from './context';

function App() {
  const [userMenu, setUserMenu] = useContext(UserContext);

  return (
      <div className="App">
        <header className="App-header">
          {userMenu[`menu`] === `login` ? <LoginPanel /> : null}
          {userMenu[`menu`] === `main` ? <Main /> : null}
          {/* <Loading /> */}
          {/* <LoginPanel />
          <Main /> */}
        </header>
      </div>
  );
}

export default App;
