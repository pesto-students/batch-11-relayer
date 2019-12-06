import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';
import './assets/styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
