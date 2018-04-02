import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import LoginView from './LoginView'
import Switcher from './Switcher'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switcher/>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
