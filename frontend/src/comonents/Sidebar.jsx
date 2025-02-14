import React from "react";
import { iconButtonClasses, List, ListItem, ListItemButton, ListItemIcon} from '@mui/material';
import {Home as HomeIcon, Settings as SettingsIcon} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const menuItems = [
    {
        text: 'Home',
        icon: <HomeIcon />,
        path:'/dashboard'
    },
    {
        text: 'Settings',
        icon: <SettingsIcon />,
        path:'/dashboard/settings'
    }
];

const Sidebar = ()=>{
    const navigate = useNavigate();

    return (
        <List>
            {menuItems.map((item,index)=>(
                <ListItem key={index}>
                    <ListItemButton onClick={()=>navigate(item.path)} startIcon={item.icon}>{item.text}</ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default Sidebar;