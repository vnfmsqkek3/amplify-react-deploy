import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import UserInfo from './widgets/user-info.js';
import IoTMessageViewer from './widgets/iot-message-viewer.js';
import DemoWidget from './widgets/demo-widget.js';
import DeviceViewer from './widgets/DeviceViewer.js';
import {
  Root,
  Content,
  Drawer,
  DrawerHeaderContainer,
  DrawerContainer,
  Footer
} from './common/material-ui-styles.js';
import { store, view } from '@risingstack/react-easy-state';

const state = store({
  widgets: [
    {
      component: UserInfo,
      displayName: 'Cognito Info',
      id: 'cognito-info',
    },
    {
      component: DeviceViewer,
      displayName: 'Device Info',
      id: 'device-viewer',
    },
    {
      component: IoTMessageViewer,
      displayName: 'IoT Message Viewer',
      id: 'iot-message-viewer',
    },
    {
      component: DemoWidget,
      displayName: 'Demo Widget',
      id: 'demo-widget',
    },
  ]
});

state.widgets.forEach((widget, index) => {
  const localKey = `widget-isVisible-${index}`;
  const localValue = localStorage.getItem(localKey);
  if (localValue) {
    state.widgets[index].visible = localValue === 'true';
  } else {
    state.widgets[index].visible = false;
  }
});

const Body = view(() => {
  return (
    <Router>
      <Root>
        <WidgetMenu />
        <Content>
          <Toolbar />
          <Switch>
            {state.widgets.map((widget) => (
              <Route key={widget.id} path={`/${widget.id}`} component={widget.component} />
            ))}
          </Switch>
          <Footer />
        </Content>
      </Root>
    </Router>
  );
});

const WidgetMenu = view(() => {
  function clickHandler(index) {
    const newValue = !state.widgets[index].visible;
    state.widgets[index].visible = newValue;
    const localKey = `widget-isVisible-${index}`;
    localStorage.setItem(localKey, newValue);
  }

  return (
    <React.Fragment>
      <Drawer variant="persistent" open={true} style={{ position: 'fixed' }}>
        <Toolbar />
        <DrawerHeaderContainer>
          <Box m={1}>
            <Typography variant="h6">Widgets</Typography>
          </Box>
        </DrawerHeaderContainer>
        <DrawerContainer>
          <List>
            {state.widgets.map((widget, index) => {
              const labelId = `checkbox-list-label-${widget.id}`;
              return (
                <ListItem key={widget.id} dense button onClick={() => clickHandler(index)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={widget.visible}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <Link to={`/${widget.id}`}>
                    <ListItemText primary={widget.displayName} />
                  </Link>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </DrawerContainer>
      </Drawer>
    </React.Fragment>
  );
});

export default Body;
