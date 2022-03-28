import React, {useState, useContext} from 'react';
import './App.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import UserContext from './context';
import { SetUserContext } from './context';

function App() {

const [loggedUser, setLoggedUser] = useState("DUPA");

const handlerContext = (setUser) => {
  setLoggedUser(setUser);
};

const readUser = useContext(SetUserContext);

  return (
    <UserContext.Provider value={readUser}>
      <SetUserContext.Provider value={handlerContext}>
      <div className="App">
        <header className="App-header">
          {/* <Loading /> */}
          <LoginPanel />
          <Main />
        </header>
      </div>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
