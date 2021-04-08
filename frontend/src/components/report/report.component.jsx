import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';

import ReportItem from './reportItem.component';

class Report extends React.Component {

  constructor() {
    super()
    this.state = {
      reportList: [],
      facilityList: []
    }

    // this.findMyFacility = this.findMyFacility.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/reports`)
      .then(response => {
        this.setState({ reportList: response.data.data.reports })
        // console.log(response.data.data.reports)
      });   

    axios.get(`http://localhost:8000/api/facilities`)
    .then(res => {
      const facilityList = res.data.data.schedules;
      this.setState({ facilityList });
      // console.log(facilityList)
    })
  }

  // findMyFacility(input_facility_id) {
  //   var result = this.state.facilityList.filter(function (facility) {
  //       console.log(facility)
  //     return facility.facility_id == input_facility_id;
  //   });
  //   return result
  // }

  // handleDelete(event) {
  //   axios.get(`http://localhost:5000/report/${this.state.report_id}`)
  //     .then(response => {
  //       this.setState({ reportList: response.data.data.reports })
        // console.log(response.data.data.reports)
  //     });   
  // }


  render() {
    return(
      <Box my={3} mx={3}>
        <Paper elevation={5}>
          <Box px={2} py={2}>
          <Typography align="center" variant="h2">Reports</Typography>
          <br />
            <Grid container spacing={2}>
              {
                this.state.reportList.map(report => 
                <ReportItem report={report} />
              )}
            </Grid>
          </Box>
        </Paper>
      </Box>
    )
  }
}

export default Report