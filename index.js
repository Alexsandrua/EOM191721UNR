import React from "react";
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import App from './src/App';
import Resource from "./src/resource/Resource";
import RoutersCast from "./src/routes/RoutersCast";
import Db from "./src/resource/Db";
//Import our custom CSS
import './src/scss/styles.scss';

let appId = Number(window.location.pathname.split(':')[1]);

if (!appId) {
    appId = Date.now();
}
Resource.configs.idCardServer = appId;
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
RoutersCast.getTestId().then((res) => {
    //  let d =  JSON.parse(data.data); 
    if (res.statuCode === 200) {
         Db.setPpz(res.data.punchCard);
        RoutersCast.postData(Db.getPpzAll(), appId);
        root.render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        );
    } else {
        Db.setPpz(Resource.punchCard());
        RoutersCast.postData(Db.getPpzAll(), appId);
        root.render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        );
    }
}).catch((e) => {
    console.error(e);
})

