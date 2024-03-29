import React from 'react';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: "30%",
      fontSize: "100%"
    },
    
  },
  titleContent: {
    color: "white"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [dense, setDense] = React.useState(false);
  const [notification, setNotification] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const handleLogout = (event) => {
    localStorage.clear()
    window.location.replace("/")
  }

  React.useEffect(async () => {
    const result = await axios.get(`http://localhost:8000/api/notifications/${localStorage.getItem("acc_type")}`)
    setNotification(result.data.data.notifications)
  }, [])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const openNotification = Boolean(anchorElNotification);
  const idNotification = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" className={classes.titleContent} underline="none">EastCoastPlan</Link>
          </Typography>

          {
            localStorage.getItem("email") !== null ?
              localStorage.getItem("acc_type") === 'user' 
              ? <Button color="inherit" onClick={handleClickNotification}><Badge color="secondary" badgeContent={notification.length} ><NotificationsIcon /></Badge></Button>
              : <Button color="inherit" onClick={handleClickNotification}><Badge color="secondary" badgeContent={notification.length} ><NotificationsIcon /></Badge></Button>
            :
            null
          }
          
          {
            localStorage.getItem("email") !== null ?
            <div className={classes.search}>Hello, {localStorage.getItem("email").split("@")[0]} ({
                localStorage.getItem("acc_type") === 'user' ? "USER" : "ADMIN"
              })</div>
            :
            null
          }

          <Button color="inherit" href="/aboutus">About Us</Button>
          {
            localStorage.getItem("email") !== null ?
              localStorage.getItem("acc_type") === 'user' ? null : <Button color="inherit" href="/report">Reports</Button>
            :
            null
          }
          <Button color="inherit" href="/facilities">Facilities</Button>
          {
            localStorage.getItem("email") != null ?
             <Button color="inherit" aria-describedby={id} onClick={handleClick}>Logout</Button>
            :
            <Button color="inherit" href="/signinsignup">Login</Button>
          }

          {/* Notification */}
          <Popover 
            id={idNotification}
            open={openNotification}
            anchorEl={anchorElNotification}
            onClose={handleCloseNotification}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div className={classes.demo}>
              <List dense={dense}>
              {
                notification.map(notify => 
                  <div>
                    <ListItem button>
                      <ListItemText
                        primary={notify.facility_name}
                        secondary={notify.message}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                )
              }
                {/* {generate(
                  <div>
                    <ListItem button>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <Divider />
                  </div>
                )} */}
              </List>
            </div>
          </Popover>


          {/* Logout */}
          <Popover 
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box m={2}>
              <Typography variant="h7" className={classes.title}>
                <strong>Confirm Log Out?</strong>
              </Typography>
              <Box my={1}>
                <Box component="span" mx={3}>
                  <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
}