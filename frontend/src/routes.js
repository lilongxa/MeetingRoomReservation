import React from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Reserve from "./pages/Reserve";
import MeetingRooms from "./pages/MeetingRooms";
import ProtectedRoute from "./components/ProtectedRoute";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import UserTable from "./pages/UserTable";
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
                path: "/",
                element: <Home />,
            },
            {
                path: "/users",
                element: <UserTable />,
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