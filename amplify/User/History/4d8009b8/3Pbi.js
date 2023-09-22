import React from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppBarHeader, Title } from './common/material-ui-styles.js';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

const Header = view(() => {
  
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ background: '#282c34' }}>
      <Toolbar sx={{ padding: '8px 16px' }}> {/* Adjusted padding here */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AWS Toolkit
        </Typography>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );

});

export default Header;
