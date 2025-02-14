import React from 'react';
import {Box, Container} from '@mui/material';
import Sidebar from './Sidebar';
import {Outlet} from 'react-router-dom';

const DashboardLayout = ()=>{
    return (
        <Box sx={{ display:'flex'}}>
            <Box sx={{ width:'20%', padding:2}}>
                <Sidebar/>
            </Box>
            <Box sx={{ width:'80%', padding:2}}>
                <Container>
                    <Outlet/>
                </Container>
            </Box>
        </Box>
    );
};

export default DashboardLayout;