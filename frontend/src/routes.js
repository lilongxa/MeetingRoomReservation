import React from "react";
import Layout from "./components/layout/ToolpadLayout";
import Login from "./pages/auth/Login";
import Booking from "./pages/Booking";
import MeetingRooms from "./pages/MeetingRooms";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookings from "./pages/Bookings";
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
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "users",
                element: <Users />,
            },  
            {
                path: "booking",
                element: <Booking />,
            },
            {
                path: "meeting-rooms",
                element: <MeetingRooms />,
            },
            {
                path: "bookings",
                element: <Bookings />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
];

export default routes;