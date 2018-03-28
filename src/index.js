import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginView from './LoginView'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoginView />, document.getElementById('root'));
registerServiceWorker();
