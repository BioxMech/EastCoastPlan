import React from 'react';
import axios from 'axios';
import { Button  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import './bookingform.styles.scss';

class BookingForm extends React.Component {

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
    var path = window.location.pathname.replaceAll("%20", "_").split("/").splice(2,4).join("/");

    this.state = {
      facilityInfo: [],
      date: date,
      facilityName: props.facilityName,
      scheduleID: props.scheduleID,
      timeslots: [],
      todayTimeSlots: [],
      path: path,
      checker: false,
      disabled: true,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    setTimeout(() => {
      if (this.state.timeslots[0].start.slice(0,10) == this.state.date) {
        this.setState({checker:true, disabled:false})
      }
    }, 2500)
    
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/getSlots/${this.state.path}`)
      .then(response => {
        this.setState({ timeslots: response.data.data })
      });      
  }

  handleChange(event) {
    this.setState({date: event.target.value});
    setTimeout(() => {
      // console.log(this.state.date)
      var json = {
        from : this.state.date,
      }

      axios.post(`http://localhost:5002/getSlots/${this.state.path}`, json)
      .then(response => {
        this.setState({ timeslots: response.data.data })
      });
      this.setState({loading: true})
    }, 100);

    setTimeout(() => {
      if (this.state.timeslots[0].start.slice(0,10) == this.state.date) {
        this.setState({checker:true, disabled:false})
      }
      else {
        this.setState({checker:false, disabled:true})
      }
      this.setState({loading: false})
    }, 2500)

    
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField id="standard-error" label="Name"/>
        </div>
        <div>
          <TextField id="standard-error" label="Price"/>
        </div>
        <div>
          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.date} 
            onChange={this.handleChange}
          />
        </div>
        <div>
            {
              this.state.loading ?
              <Fade
                in={this.state.loading}
                style={{
                  transitionDelay: this.state.loading ? '300ms' : '0ms',
                }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
              :
              <FormControl>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Timeslots
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  // value={age}
                  // onChange={this.handleChange}
                  displayEmpty
                >
                  {
                    this.state.checker ?
                    this.state.timeslots.filter(tsDetails => tsDetails.start.slice(0,10) == this.state.date).map(timeslotDetails => 
                      {   
                        var date = timeslotDetails.start.slice(0,10);
                        var start_time = timeslotDetails.start.slice(11) + ":00";
                        var end_time = timeslotDetails.finish.slice(11) + ":00";
                        var timeslot = `${date} ${start_time}-${end_time}`
                        return (
                          <MenuItem value={start_time}>
                            {timeslot}  
                          </MenuItem>
                        )
                      }
                    )
                    :
                    <MenuItem value="">
                      <em>--- No available timeslots ---</em>
                    </MenuItem>
                  }
                </Select>
                <FormHelperText>Label + placeholder</FormHelperText>
              </FormControl>
            }
          
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={this.state.disabled}
        >
          BOOK NOW
        </Button>
      </form>
      
    )
  }
}

export default BookingForm