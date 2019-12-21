import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';
import './assets/styles/main.scss';
import { UserProvider } from "./shared/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Main />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
