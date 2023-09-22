import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 250;

export const Root = styled('div')({
  display: 'flex',
});

export const Title = styled('div')({
  flexGrow: 1,
});

export const AppBarHeader = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Footer = styled('div')({
  textAlign: 'center',
});

export const Drawer = styled('div')({
  width: drawerWidth,
  flexShrink: 0,
});

export const DrawerHeaderContainer = styled('div')({
  textAlign: 'center',
});

export const DrawerPaper = styled('div')({
  width: drawerWidth,
});

export const DrawerContainer = styled('div')({
  overflow: 'auto',
});

export const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
}));

export const WidgetContainer = styled('div')({
  padding: '4px',
});
