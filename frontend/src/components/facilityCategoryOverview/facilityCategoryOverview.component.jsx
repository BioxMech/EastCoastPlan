import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FacilityCategory from '../facilityCategory/facilityCategory.component';

class FacilitiesList extends React.Component {

  constructor() {
    super();
    this.state = {
      facilityDict: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/facilities`)
    .then(res => {
      const facilityDict = res.data.data.schedules;
      this.setState({ facilityDict });
    })
  }
  
  render() {
    return (
        <Container >
          <Box my={2}>
            <h1>Facilities</h1>
            <Grid
              container
              spacing={2}
            >
              { this.state.facilityDict.map(facility => 
                <Grid item xs={12} sm={6} md={4}>
                  <FacilityCategory facility={facility} />
                </Grid>
                ) 
              }
            </Grid>
          </Box>
        </Container> 
      
    )
  }
}

export default FacilitiesList