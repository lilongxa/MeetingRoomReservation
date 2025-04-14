import React from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Reserve from "./pages/Reserve";
import MeetingRooms from "./pages/MeetingRooms";
import AuthGuard from "./components/AuthGuard";
import Reservations from "./pages/Reservations";
import UserList from "./pages/UserList";
import Home from "./pages/Home";

const routes = [
    {
        path: "/",
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/users",
                element: <UserList />,
            },  
            {
                path: "/reserve",
                element: <Reserve />,
            },
            {
                path: "/meeting-rooms",
                element: <MeetingRooms />,
            },
            {
                path: "/reservations",
                element: <Reservations />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
];

export default routes;