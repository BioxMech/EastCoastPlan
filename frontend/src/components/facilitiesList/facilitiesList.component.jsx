import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

class FacilitiesList extends React.Component {

  constructor() {
    super();
    this.state = {
      facilityList: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/reports`)
    .then(res => {
      const persons = res.data;
      this.setState({ facilityList });
    })
  }

  render() {
    return (
      <Grid
        container
        spacing={2}
      >
        { this.state.facilityList.map(facility => <Grid item xs={4}>{facility.}</Grid>)}
      </Grid>
    )
  }
}

export default FacilitiesList