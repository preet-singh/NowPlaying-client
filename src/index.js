//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { UserProvider } from './utils/context';

//Components
import App from './App';

//CSS
import './reset.css';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
    </BrowserRouter>, document.getElementById('root'));