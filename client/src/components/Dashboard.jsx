import React, { useState } from 'react';
import Accomodation from './Accomodation.jsx';
import Transport from './Transport.jsx';
import { Container, Typography, Tabs, Tab, Box, Paper } from '@mui/material';
function Dashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Accomodation" />
          <Tab label="Transport" />
        </Tabs>
        <Box>
          {tab === 0 && <Accomodation />}
          {tab === 1 && <Transport />}
        </Box>
      </Paper>
    </Container>
  );
}

export default Dashboard;
