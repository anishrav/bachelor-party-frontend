import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import TripCard from './components/TripCard';
import './App.css';
import AttendeeList from './components/AtendeeList';
import ActivityForm from './components/ActivityForm';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import { RootState } from './store/store';
import { setUser, logout, setAuthLoading } from './store/actions/authActions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setUser({ user, token }));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        dispatch(setAuthLoading(false));
      }
    } else {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch(logout());
  };

  // Check if on callback route
  const isCallbackRoute =
    window.location.pathname === '/auth/callback' || window.location.search.includes('token=');

  if (isCallbackRoute) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthCallback />
      </ThemeProvider>
    );
  }

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ flex: 1, mb: 0 }}
          >
            Anish's Bachelor Party
          </Typography>
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="bachelor party tabs">
              <Tab label="Event Details" {...a11yProps(0)} />
              <Tab label="Attendees" {...a11yProps(1)} />
              <Tab label="Activities" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <TripCard
              title="Anish's Bachelor Party"
              destination="Austin, TX"
              startDate="April 2, 2026"
              endDate="April 5, 2026"
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <AttendeeList />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <ActivityForm />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
