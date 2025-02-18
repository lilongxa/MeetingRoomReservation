import React from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Reserve from "./pages/Reserve";
import MeetingRooms from "./pages/MeetingRooms";
import ProtectedRoute from "./components/ProtectedRoute";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Home from "./pages/Home";

const routes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                path: "/home",
                element: <Home />,
            },
            {
                path: "/users",
                element: <Users />,
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