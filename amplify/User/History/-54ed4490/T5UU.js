import { styled } from '@mui/material/styles';

const drawerWidth = 250;

export const Root = styled('div')({
  display: 'flex',
});

export const Title = styled('div')({
  flexGrow: 1,
});

export const AppBarHeader = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 10,
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

export const Widget = styled(Paper)({
  width: '80%', // 원하는 폭으로 조절
  height: 'auto', // 높이는 내용에 따라 자동으로 조절
  padding: '16px',
  margin: '16px 0',
});