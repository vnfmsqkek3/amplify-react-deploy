import React from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Widget = view(({ children }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const paddingSize = isXs ? 1 : 2; // Adjust padding based on screen size
  
  return (
    <Container style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
      <Paper elevation={3} style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box p={paddingSize} m={1} display="flex" flexDirection="column" flexGrow={1}>
          {children}
        </Box>
      </Paper>
    </Container>
  );
});

export default Widget;
