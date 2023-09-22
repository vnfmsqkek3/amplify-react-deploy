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
    <AppBar position="fixed" className={AppBarHeader}>
      <Toolbar>
        <Typography variant="h6" className={Title}>
          AWS Toolkit
        </Typography>
        <Button onClick={handleSignOut} color="inherit" sx={{ padding: '8px 100px' }}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );

});

export default Header;
