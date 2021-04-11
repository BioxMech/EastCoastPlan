import React from 'react';
import axios from 'axios';
import { Container, Box, Paper, Grid  } from '@material-ui/core';

import './booking.styles.scss';
import FacilityDetail from './facilityDetails.component';
import BookingForm from './bookingform.component';

class Booking extends React.Component {

  constructor() {
    super()
    this.state = {
      facilityInfo: [],
      facilityName: '',
      scheduleID: '',
      price: 0,
      internal_name: ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/${window.location.pathname}`)
    .then(res => {
      const facilityInfo = res.data.data.resources[0];
      this.setState({ facilityInfo });
      const facilityName = facilityInfo.facility_name;
      this.setState({ facilityName });
      const scheduleID = facilityInfo.schedule_id;
      this.setState({ scheduleID })
      const price = facilityInfo.price;
      this.setState({ price })
      const internal_name = facilityInfo.internal_name;
      this.setState({ internal_name })

    })
  }

  render() {
    return (
      <Container>
        <Box my={5}>
          <Paper elevation={5} >
          <Box mx={3}>
            <Grid container spacing={3} className="bookingContent">
              <Grid item xs={12} sm={4}>
                <FacilityDetail facilityInfo={this.state.facilityInfo} />
              </Grid>
              <Grid item xs={12} sm={8} >
                <Paper elevation={3}>
                  <Box mx={3} py={1}>
                    <h1>Booking Details</h1>
                    <BookingForm facilityInfo={this.state.facilityInfo} facilityName={this.state.facilityName} scheduleID={this.state.scheduleID} price={this.state.price} internal_name={this.state.internal_name} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  }
}

export default Booking