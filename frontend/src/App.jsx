import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './comonents/Login';
import DashboardLayout from './comonents/DashboardLayout';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const App = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogIn = (username, password)=>{
        if(username === 'admin' && password === 'password'){
            setIsLoggedIn(true);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path='./login' element={<Login onLogin={handleLogIn}/>}>sdfsdf</Route>
                <Route path='dashboard'
                       element={isLoggedIn?(<DashboardLayout>
                        <Route index element={<HomePage/>} />
                        <Route path='settings' element={<SettingsPage/>} />
                       </DashboardLayout>):(<Navigate to="/login" />)}
                ></Route>
            </Routes>
        </Router>
    );
};

export default App;