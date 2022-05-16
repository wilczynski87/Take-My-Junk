import React, { useContext} from 'react';
import 'w3-css/w3.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import CreateAuction from './CreateAuction';
import Register from './Register';
import Settings from './Settings';
import Professional from './Professional.js';
import Alert from './Alert';
import { UserContext } from './context';

function App() {
  const [userMenu, setUserMenu] = useContext(UserContext);

  return (
      <div className="w3-container w3-teal w3-center">
          {userMenu[`menu`] === `login` ? <LoginPanel /> : null}
          {userMenu[`menu`] === `main` ? <Main /> : null}
          {userMenu[`menu`] === `createAuction` ? <CreateAuction /> : null}
          {userMenu[`menu`] === `register` ? <Register /> : null}
          {userMenu[`menu`] === `professional` ? <Professional /> : null}
          {userMenu[`menu`] === `settings` ? <Settings /> : null}
          {userMenu[`menu`] === `alert` ? <Alert /> : null}
          {/* <Loading /> */}
          {/* <LoginPanel />
          <Main /> */}
      </div>
  );
}

export default App;
