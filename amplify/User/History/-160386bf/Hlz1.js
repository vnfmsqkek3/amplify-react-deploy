import React from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Widget = view(({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      style={{ 
        height: 'auto', 
        maxHeight: '100vh', 
        overflow: 'auto', 
        width: isMobile ? '100vw' : '80vw', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }} 
      maxWidth="xl"
    >
      <Paper elevation={3} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box p={2} m={1} display="flex" flexDirection="column">
          {children}
        </Box>
      </Paper>
    </Container>
  );
});

export default Widget;
