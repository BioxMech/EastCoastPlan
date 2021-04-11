import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FacilityItem from '../facilityItem/facilityItem.component';

class Facility extends React.Component {

  constructor() {
    super();
    this.state = {
      facilityList: [],
      facilityName: ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/${window.location.pathname}`)
    .then(res => {
      const facilityList = res.data.data.resources;
      this.setState({ facilityList });
      console.log(facilityList)
      const temp = res.data.data.resources[0].facility_name.split(" ")
      temp.pop()
      const facilityName = temp.join(" ");
      this.setState({ facilityName });
    })
  }

  render() {

    return (
      <Container >
        <Box my={2}>
          <h1>{ this.state.facilityName }</h1>
          <Grid
            container
            spacing={6}
          >
            { this.state.facilityList.map(facility => 
              <Grid item xs={12}>
                <FacilityItem facility={facility} />
              </Grid>
              ) 
            }
          </Grid>
        </Box>
      </Container> 
    )
  }
}

export default Facility