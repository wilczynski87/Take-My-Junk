import React, {useState} from 'react';
import './App.css';
import Loading from './Loading.js';
import LoginPanel from './Login';
import Main from './main';
import ContextProv from './context';

const initialState = {"email": "No user logged yet!", "password": "password"};

function App() {

  const [loggedUser, setLoggedUser] = useState(initialState);

  const handlerUser = (setUser) => {
    setLoggedUser(setUser);
  };

  return (
    <ContextProv>
      <div className="App">
        <header className="App-header">
          {/* <Loading /> */}
          <LoginPanel />
          <Main />
        </header>
      </div>
    </ContextProv>
  );
}

export default App;
