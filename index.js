import React from "react";
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import App from './src/App';
//Import our custom CSS
import './src/scss/styles.scss';

let appId = '';
if(!Number(window.location.pathname.split(':')[1])){
 appId = Date.now(); 
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={`/id:${appId}`} replace />,
    },
    {
        path: "/:id",
        element: < App />,
    },
])
const motherContainer = document.getElementById('app');
const root = ReactDOM.createRoot(motherContainer);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} /> 
    </React.StrictMode>
);
