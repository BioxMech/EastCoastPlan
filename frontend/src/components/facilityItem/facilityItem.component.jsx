import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { createMuiTheme, responsiveFontSizes, ThemeProvider, withStyles } from '@material-ui/core/styles';

import './facilityItem.styles.scss';

class FacilityItem extends React.Component {
  
  constructor(props) {
    super(props) 

    var today = new Date();
    var month = (today.getMonth() + 1);
    var day = today.getDate()
    if ( month < 10) {
      month = "0" + (today.getMonth() + 1);
    }

    if ( day < 10 ) {
      day = "0" + (today.getDate())
    }

    var date = today.getFullYear() + '-' + month + '-' + day;
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    this.state = {
      facility: props.facility,
      disabled: false,
      availability: props.facility.availability, 
      anchorEl: null,
      date: date,
      time: time,
      message: ''
    }

    this.handleUnavailability = this.handleUnavailability.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSelect = this.handleCloseSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    if (this.state.availability === "No") {
      this.setState({disabled:true})
    }
  }

  handleUnavailability(event) {
    const availability = this.state.availability == "Yes" ? "No" : "Yes"
    this.setState({disabled:!this.state.disabled, availability: availability})
    
    var json = { 
      availability: availability
    }
    axios.put(`http://localhost:5002/updateAvailability/${this.state.facility.facility_id}`, json)
      .then(response => {
        // console.log(response.data)
        // console.log(this.state.facility.facility_id)
        // console.log(availability)
      })
      .catch(error => {
        if (error.response.status == 400) {
          this.setState({show:true, disabled:true, loading: false})
        }
      })
  }

  handleClick(event) {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose() {
    this.setState({anchorEl: null});
  };

  handleSelect(event) {
    this.setState({message: event.target.value})
  }

  handleCloseSelect(event) {
    const message = event.target.textContent
    this.setState({anchorEl: null, message: event.target.textContent});
    const date = this.state.date.split("-").join("")
    const time = this.state.time.split(":").join("")
    var json = {
      date: date,
      facility_id: String(this.state.facility.facility_id), 
      message: message, 
      time: time
    }
    console.log(json)
    axios.post(`http://localhost:5000/createReport`, json)
    .then(response => {
      console.log(response)
      console.log("Is it working yet, Hong Yang?")
    })
    .catch( error => {
      console.log(error)
    })
  }

  render() {

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);
    const acc_type = localStorage.getItem("acc_type") || null;

    const ColorButton = withStyles((theme) => ({
      root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
    }))(Button);

    return(
      <Paper elevation={5} className="content">
        <Box mx={2} >
          <Grid container spacing={3} >
            <Grid item xs={12} sm={4}>
              <img src={ this.state.facility.image_url } className="image test" alt="...Loading" />
            </Grid>
            <Grid item xs={12} sm={8} className="description">
              <ThemeProvider theme={theme}>
                <Typography variant="h4">{ this.state.facility.facility_name }</Typography>
                <Typography variant="h6" className="location">{ this.state.facility.location }</Typography>
                <Typography variant="h6">SGD${ this.state.facility.price }</Typography>
              </ThemeProvider>
              <Box spacing={3}>
                <Button size="small" variant="contained" color="primary" disabled={this.state.disabled} href={window.location.pathname + "/" + this.state.facility.facility_name}>
                  BOOK
                </Button>
                {
                  acc_type == "admin" ?
                    this.state.disabled ?
                    <Box component="span" ml={2}>
                      <ColorButton size="small" variant="contained" color="primary" onClick={this.handleUnavailability} >
                        Mark Available
                      </ColorButton>
                    </Box> 
                    : 
                      <Box component="span" ml={2}>
                        <Button size="small" variant="contained" color="secondary" onClick={this.handleUnavailability} >
                          Mark Unavailable
                        </Button>
                      </Box> 
                  :
                  <Box component="span" ml={2}>
                    <Button size="small" variant="contained" color="secondary" onClick={this.handleClick}>
                      REPORT FACILITY
                    </Button>
                  </Box>
                  
                }
              </Box>
              {
                this.state.disabled ?
                <Box mt={1}>
                  <Typography color="secondary" >Currently Unavailable</Typography>
                </Box>
                :
                null
              }

              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onChange={this.handleSelect}
                onClose={this.handleClose}
                
              >
                <MenuItem onClick={this.handleCloseSelect} value="Broken Chair">Broken Chair</MenuItem>
                <MenuItem onClick={this.handleCloseSelect} value="Broken Roof">Broken Roof</MenuItem>
                <MenuItem onClick={this.handleCloseSelect} value="Poor Cleanliness">Poor Cleanliness</MenuItem>
              </Menu>
              
            </Grid>
          </Grid>
        </Box>
      </Paper>
    )
  }
  
}

export default FacilityItem