// src/Dashboard.js
import React from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Drawer, CssBaseline } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">后台管理</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button>
            <ListItemText primary="首页" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="用户管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="设置" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: 240,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          欢迎来到后台管理页面
        </Typography>
        <Typography variant="body1">
          这里是内容区域，展示更多的信息和管理功能。
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
