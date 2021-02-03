import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '../AppBar/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import HomeIcon from '@material-ui/icons/Home';
import { toggleDrawer } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#14171A',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: '#FFFFF',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#FFFFF",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
  },
  listIcon: {
    fontSize: '24px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '32px',
    },
  },
  listItemText:{
    textDecoration: 'none'
  }
}));

export default function SideDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector(state => state.reducer.toggleDrawer);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        appClass={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        toggle={() => dispatch(toggleDrawer())}
      >
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => dispatch(toggleDrawer())}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <NavLink style={{color: '#757575', textDecoration: 'none'}} to={'/'}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon className={classes.listIcon}/>
            </ListItemIcon>
            <ListItemText primary={"Main page"} />
          </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
        <NavLink style={{color: '#757575', textDecoration: 'none'}} to={'/History'}>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon className={classes.listIcon}/>
            </ListItemIcon>
            <ListItemText primary={"History"} />
          </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List className="DesktopOnly">
          <NavLink style={{color: '#757575', textDecoration: 'none'}} to={'/Statistics'}>
          <ListItem button>
            <ListItemIcon>
              <TimelineIcon className={classes.listIcon}/>
            </ListItemIcon>
            <ListItemText primary={"Statistics"} />
          </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <div className={classes.toolbar} />
    </div>
  );
}