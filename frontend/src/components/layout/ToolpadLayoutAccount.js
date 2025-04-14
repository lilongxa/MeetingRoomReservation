import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GroupsIcon from '@mui/icons-material/Groups';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import HomeIcon from '@mui/icons-material/Home';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { useDemoRouter } from '@toolpad/core/internal';
import { AppBar,Toolbar } from '@mui/material';

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
    icon: <GroupsIcon />,
    children: [
      {
        segment: 'meeting-room-management',
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
      }
    ],
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ManageAccountsIcon />,
  },
];

const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
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
  
  function ToolpadLayoutAccount(props) {
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
  
    const router = useDemoRouter('/dashboard');
  
    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;
  
    return (
      // preview-start
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                My Custom Toolpad Title
                </Typography>
            </Toolbar>
            </AppBar>
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
      // preview-end
    );
  }
  
  export default ToolpadLayoutAccount;