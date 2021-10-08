import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { Link } from 'react-router-dom';
import { RouteNames } from '../pages/RouterPages';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListSubheader from '@mui/material/ListSubheader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      marginLeft: `-${drawerWidth}px`,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { logout } = useActions();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Just Study
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <div>
            <Link to={RouteNames.MAIN} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Главная" />
              </ListItem>
            </Link>
            <Link to={RouteNames.STORE} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Каталог" />
              </ListItem>
            </Link>
            <Link to={RouteNames.COURSES} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Мои курсы" />
              </ListItem>
            </Link>
            <Link to={RouteNames.HOMEWORKS} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary="Домашние задания" />
              </ListItem>
            </Link>
            <ListItem button disabled={true}>
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText primary="Словарь" />
            </ListItem>
            <ListItem button disabled={true}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Тренировки" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader inset>Личный кабинет</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Мой профиль" />
            </ListItem>
            <ListItem button disabled={true}>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="История оплаты" />
            </ListItem>
            <ListItem button onClick={() => logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </div>
        </List>
      </Drawer>
    </>
  );
}
