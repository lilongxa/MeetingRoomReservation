import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import HomeIcon from '@mui/icons-material/Home';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { Outlet } from "react-router-dom";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  
      {
        segment: 'meeting-rooms',
        title: 'MeetingRooms',
        icon: <MeetingRoomIcon />,
      },
      {
        segment: 'reserve',
        title: 'Reserve',
        icon: <PermPhoneMsgIcon />,
      },
      {
        segment: 'reservation',
        title: 'Reservations',
        icon: <BookOnlineIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ManageAccountsIcon />,
  },
];

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};
  
  const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
  
    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);
  
    return router;
  }
  
  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <RoomIcon fontSize="large" color="primary" />
        <Typography variant="h6">Meeting Room Reservation System</Typography>
      </Stack>
    );
  }

  function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }

  function SidebarFooter({ mini }) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© BRUCE' : `© ${new Date().getFullYear()} Made with love by BRUCE`}
      </Typography>
    );
  }
  
  SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
  };

  const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));
  
  export default function ToolpadLayout(props) {
    const { window } = props;
   
    const [session, setSession] = React.useState({
      user: {
        name: 'Bharat Kashyap',
        email: 'bharatkashyap@outlook.com',
        image: 'https://avatars.githubusercontent.com/u/19550456',
      },
    });
  
    const authentication = React.useMemo(() => {
      return {
        signIn: () => {
          setSession({
            user: {
              name: 'Bharat Kashyap',
              email: 'bharatkashyap@outlook.com',
              image: 'https://avatars.githubusercontent.com/u/19550456',
            },
          });
        },
        signOut: () => {
          setSession(null);
        },
      };
    }, []);
    const router = useDemoRouter('/home');
  
    // Remove this const when copying and pasting into your project.
    // const demoWindow = window ? window() : undefined;
  
    console.log(router);
    return (
      <AppProvider
        navigation={NAVIGATION}
        session={session}
        authentication={authentication}
        router={router}
        theme={demoTheme}
        // window={demoWindow}
      >
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          <Box sx={{padding:'10px', marginLeft:'20px'}}>
            <Outlet />
          </Box>
        </DashboardLayout>
      </AppProvider>
    );
  }