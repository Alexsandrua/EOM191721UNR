import React from "react";
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import AppWrapper from './src/AppWrapper';
import Resource from "./src/resource/Resource";
import StateVar from "./src/resource/StateVariables";
import Db from "./src/resource/Db";
import RoutersCast from "./src/routes/RoutersCast";
import './src/scss/styles.scss';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={`/${Date.now()}`} replace />,
    },
    {
        path: "/:id",
        element: <AppWrapper />,
        loader: async ({ params }) => {
            const res = await RoutersCast.getTestId(Number(params.id));
            console.log('INDEX RES ',res)
            if (res) {
                if (res.statuCode == 200)
                    Db.ppz = res.data.punchCard;
                else Db.ppz = [Resource.punchCard()];
            } else Db.ppz = [Resource.punchCard()];
            console.log('INDEX', Db.getPpzAll(), Resource.punchCard());
            StateVar.sessionId = params.id;
        },
    },
]);

const motherContainer = document.getElementById('app');
const root = ReactDOM.createRoot(motherContainer);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);