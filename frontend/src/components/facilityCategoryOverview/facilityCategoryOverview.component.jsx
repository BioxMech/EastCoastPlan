import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import FacilityCategory from '../facilityCategory/facilityCategory.component';

class FacilitiesList extends React.Component {

  constructor() {
    super();
    this.state = {
      facilityDict: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/facilities`)
    .then(res => {
      const facilityDict = res.data.data.schedules;
      console.log(res)
      this.setState({ facilityDict });
      console.log(facilityDict)
    })
  }
  
  render() {
    return (
      <Grid
        container
        spacing={2}
      >
        { this.state.facilityDict.map(facility => 
          <Grid item xs={4}>
            <FacilityCategory facility />
          </Grid>
          ) 
        }
      </Grid>
    )
  }
}

export default FacilitiesList