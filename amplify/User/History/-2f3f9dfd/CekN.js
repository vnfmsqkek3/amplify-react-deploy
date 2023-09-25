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
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import getOpenSearchEndpoint from './widgets/opensearch.js';

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
      component: DemoWidget,
      displayName: 'Demo Widget',
      id: 'demo-widget',
    },
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
      component: getOpenSearchEndpoint,
      displayName: 'opensearch',
      id: 'opensearch',
    }
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
          {/* Set default route to Demo Widget */}
          <Route path="/" element={<DemoWidget />} />
          
          {state.widgets.map((widget) => {
            return (
              <Route path={`/${widget.id}`} element={React.createElement(widget.component)} key={widget.id} />
            );
          })}
        </Routes>
        <Footer />
      </Content>
    </Root>
  );
});



const WidgetMenu = view(() => {
  const navigate = useNavigate();

  function clickHandler(index) {
    // 모든 위젯의 visible 상태를 false로 설정
    state.widgets.forEach(widget => widget.visible = false);

    // 클릭한 위젯만 visible 상태를 true로 설정
    state.widgets[index].visible = true;

    // 로컬 스토리지에 위젯의 상태를 저장
    state.widgets.forEach((widget, idx) => {
        const localKey = `widget-isVisible-${idx}`;
        localStorage.setItem(localKey, widget.visible);
    });

    // 선택한 위젯의 경로로 이동
    navigate(`/${state.widgets[index].id}`);
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
