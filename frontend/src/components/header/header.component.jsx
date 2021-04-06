import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router';

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    localStorage.clear()
    window.location.replace("/")
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link href="/" className={classes.titleContent} underline="none">EastCoastPlan</Link>
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
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
                Confirm Log Out?
              </Typography>
              <Box component="span" mx={3}>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Box>
            </Box>
            
            
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
}