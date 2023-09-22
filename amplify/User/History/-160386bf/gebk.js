import React from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Widget = view(({ children }) => {
  return (
    <Container>
      <Paper elevation={3}>
        <Box p={10} m={10}>
          {children}
        </Box>
      </Paper>
    </Container>
  );
});

export default Widget; 