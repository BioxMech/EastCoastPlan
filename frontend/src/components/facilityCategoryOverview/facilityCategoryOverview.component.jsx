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
      facilityDict: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/facilities`)
    .then(res => {
      const facilityDict = res.data.data.schedules;
      this.setState({ facilityDict, loading: false });
    })
    .catch(error => {
      alert("Please check if your microservices are working.")
    })
  }
  
  render() {
    return (
      <Container >
      {
        this.state.loading ? 
        <img src='./component-loader.gif' style={{width:"100%", height:"100%"}} />
        :
        
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
        
      }
      </Container>  
      
    )
  }
}

export default FacilitiesList