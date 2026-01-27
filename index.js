import React from "react";
import ReactDOM from 'react-dom/client';
import App from './src/App';
//Import our custom CSS
import './src/scss/styles.scss';
//Import all of Bootstrap’s JS
//import * as bootstrap from 'bootstrap'


//import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
//import { Tooltip, Toast, Popover } from 'bootstrap'


const motherContainer = document.getElementById('app');
const root = ReactDOM.createRoot(motherContainer);
root.render(<App />);
