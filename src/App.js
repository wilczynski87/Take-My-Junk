import React, { useContext} from 'react';
import 'w3-css/w3.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import CreateAuction from './CreateAuction';
import { UserContext } from './context';

function App() {
  const [userMenu, setUserMenu] = useContext(UserContext);

  return (
      <div className="w3-container w3-teal">
          {userMenu[`menu`] === `login` ? <LoginPanel /> : null}
          {userMenu[`menu`] === `main` ? <Main /> : null}
          {userMenu[`menu`] === `createAuction` ? <CreateAuction /> : null}
          {/* <Loading /> */}
          {/* <LoginPanel />
          <Main /> */}
      </div>
  );
}

export default App;
