import React, {useState} from 'react';
import './App.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import UserContext from './context';

function App() {

  const [loggedUser, setLoggedUser] = useState("DUPA");

  const handlerUser = (setUser) => {
    setLoggedUser(setUser);
  };

  return (
    <UserContext.Provider value={loggedUser}>
      <div className="App">
        <header className="App-header">
          {/* <Loading /> */}
          <LoginPanel setUser = {handlerUser}/>
          <Main />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
