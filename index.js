import React from "react";
import ReactDOM from 'react-dom/client';
import  { 
    createBrowserRouter, 
    RouterProvider, 
    Navigate, 
    BrowserRouter, 
    Routes, Route } from 'react-router-dom';
//import {BrowserRouter, Routers, Route} from "react-router-dom"
import App from './src/App';
import RoutersCast from './src/routes/RoutersCast';
//Import our custom CSS
import './src/scss/styles.scss';

//RoutersCast.getSessionmem();

const router = createBrowserRouter([
    {
        path:"/",
        element:<Navigate to="/home" replace />,
    },
    {
        path:"home",
        element:< App />,
    },
])
console.log('Hello-------------------------')
const motherContainer = document.getElementById('app');
const root = ReactDOM.createRoot(motherContainer);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
