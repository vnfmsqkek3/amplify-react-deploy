import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import CssBaseline from '@mui/material/CssBaseline';
import { Root } from './components/common/material-ui-styles.js';
import Header from './components/header';
import Body from './components/body';

function App() {
  return (
    <Root>
      <CssBaseline />
      <Header />
      <Body />
    </Root>
  );
}

export default withAuthenticator(App);
