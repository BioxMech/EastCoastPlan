import React from 'react';
import axios from 'axios';
import { Container, Box, Paper, Grid, Button, FormControl  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import './booking.styles.scss';
import FacilityDetail from './facilityDetails.component';

class Booking extends React.Component {

  constructor() {
    super()
    this.state = {
      facilityInfo: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/${window.location.pathname}`)
    .then(res => {
      const facilityInfo = res.data.data.resources[0];
      this.setState({ facilityInfo });
    })
  }

  render() {
    return (
      <Container>
        <Box my={5}>
          <Paper elevation={5} >
            <Grid container spacing={3} className="bookingContent">
              <Grid item xs={12} sm={4}>
                <FacilityDetail facilityInfo={this.state.facilityInfo} />
              </Grid>
              <Grid item xs={12} sm={8} >
                <form >
                  <div>
                    <TextField id="standard-error" label="Name"/>
                  </div>
                  <div>
                    <TextField id="standard-error" label="Price"/>
                  </div>
                  <div>
                    <TextField
                      id="date"
                      label="Schedule"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    BOOK
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    )
  }
}

export default Booking