//widget.js
import React from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Widget = view(({ children }) => {
  return (
    <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
        <Box p={2} m={1}>
          {children}
        </Box>
      </Paper>
    </Container>
  );
});

export default Widget;
