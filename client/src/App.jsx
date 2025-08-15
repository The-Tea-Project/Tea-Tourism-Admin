import React from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import Dashboard from './components/Dashboard.jsx';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="static" color="default" elevation={2}>
        <Container maxWidth="md">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
            <Box>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Button color="primary" variant="outlined" href="/sign-in">Login / Sign Up</Button>
              </SignedOut>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </SignedOut>
      </Container>
    </>
  );
}

export default App;
