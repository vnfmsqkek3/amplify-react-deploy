import React from 'react';
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
import { store, view } from '@risingstack/react-easy-state';
import DeviceViewer from './widgets/DeviceViewer.js';
import { useNavigate } from 'react-router-dom';
import {
  Root,
  Content,
  Drawer,
  DrawerHeaderContainer,
  DrawerContainer,
  Footer
} from './common/material-ui-styles.js';

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

// On first load, check widget's visible status in localStorage
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
    <Root>
      <WidgetMenu />
      <Content>
        <Toolbar />
        <Routes>
          {state.widgets.map((widget) => (
            <Route path={`/${widget.id}`} element={React.createElement(widget.component)} key={widget.id} />
          ))}
        </Routes>
        <Footer />
      </Content>
    </Root>
  );
});

const WidgetMenu = view(() => {
  const navigate = useNavigate();

  function clickHandler(index) {
    const widget = state.widgets[index];
    const newValue = !widget.visible;
    state.widgets[index].visible = newValue;
    const localKey = `widget-isVisible-${index}`;
    localStorage.setItem(localKey, newValue);

    // Navigate to the corresponding route
    navigate(`/${widget.id}`);
  }

  return (
    <React.Fragment>
      <Drawer variant="persistent" open={true}>
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
                  <ListItemText primary={widget.displayName} />
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
