import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import store from '../src/context/store';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider
      clientId={"ee0c4ac546c5fb16e9d48b4fadcaeda8"}
      activeChain={ChainId.AvalancheFujiTestnet}>
    <Router>
      <StateContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </StateContextProvider></Router>
  </ThirdwebProvider>
)
