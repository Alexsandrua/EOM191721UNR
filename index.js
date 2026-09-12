import React from "react";
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import App from './src/App';
import Resource from "./src/resource/Resource";
import Db from "./src/resource/Db";
import './src/scss/styles.scss';

// 1. Очищуємо отримання ID. 
// Якщо шлях наприклад "/1789237364294", то split('/') даст ['', '1789237364294']
let appId = Number(window.location.pathname.replace('/', ''));

// 2. Якщо ID немає або це не число (NaN) — генеруємо нове
if (!appId || isNaN(appId)) {
    appId = Date.now();
}

Resource.configs.idCardServer = appId;

const router = createBrowserRouter([
    {
        path: "/",
        // Редиректимо просто на чисте число: /1789237364294
        element: <Navigate to={`/${appId}`} replace />,
    },
    {
        // React Router підставить число замість :id
        path: "/:id",
        element: <App />,
    },
]);

const motherContainer = document.getElementById('app');
const root = ReactDOM.createRoot(motherContainer);

Db.setPpz(Resource.punchCard());

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);


/*RoutersCast.getTestId().then((res) => {
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
})*/

