import React from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import Dashboard from './components/Dashboard.jsx';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';

function App() {
  return (
    <>
      <SignedIn>
        <AppBar position="static" color="default" elevation={2}>
          <Container maxWidth="md">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                Admin Dashboard
              </Typography>
              <Box>
                <UserButton afterSignOutUrl="/" />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <Dashboard />
        </Container>
      </SignedIn>
      <SignedOut>
        <Box sx={{ minHeight: '100vh', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              letterSpacing: 2,
              textShadow: '0 2px 8px #b2ebf2',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#00838f' }
            }}
            onClick={() => window.location.href = '/sign-in'}
          >
            LOGIN / SIGN-UP
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/" afterSignUpUrl="/" />
          </Box>
        </Box>
      </SignedOut>
    </>
  );
}

export default App;
