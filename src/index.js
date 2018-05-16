import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import Switcher from './Switcher'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switcher/>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
