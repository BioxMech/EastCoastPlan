import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';

class ReportItem extends React.Component {

constructor(props) {
  super(props)

  this.state = {
    report: this.props.report,
    report_id: this.props.report.report_id,
    setAnchorEl: null,
    open: undefined
  }

  this.handleDelete = this.handleDelete.bind(this)
  // this.handleClick = this.handleClick.bind(this)
  // this.handleClose = this.handleClose.bind(this)
}


  handleDelete(event) {
    var json = {
      date: this.state.report.date,
      time: this.state.report.time,
      message: this.state.report.message,
      facility_id: this.state.report.facility_id
    }
    axios.delete(`http://localhost:5000/report/${this.state.report_id}`, json)
      .then(response => {
        window.location.replace("/report")
        console.log(response.data.data.reports)
      });   
  }

  // handleClick = (event) => {
  //   this.setState({setAnchorEl: event.currentTarget})
  // };

  // handleClose = () => {
  //   this.setState({setAnchorEl: null});
  // };


  render() {
    // const open = Boolean(this.state.anchorEl);
    // const id = this.state.open;

    return (
          <Grid item xs={12} sm={6} md={4}>
            <Card >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Report #{this.state.report.report_id}
                </Typography>
                <Typography variant="h5" component="h2">
                  
                </Typography>
                <Typography color="textSecondary">
                  {this.state.report.date} {this.state.report.time}
                </Typography>
                <Typography variant="body2" component="p">
                  {this.state.report.message}
                  <br />
                  <Rating name="size-medium" defaultValue={Math.random()*10/2 + 1} />
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" onClick={this.handleDelete}>Delete</Button>
                {/* <Button color="inherit" 
                aria-describedby={this.state.open ? 'simple-popover' : undefined} 
                onClick={this.handleClick}>Delete</Button>
                
                <Popover 
                  id={this.state.open ? 'simple-popover' : undefined}
                  open={Boolean(this.state.anchorEl)}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box m={2}>
                    <Typography variant="h7">
                      Confirm Log Out?
                    </Typography>
                    <Box component="span" mx={3}>
                      <Button size="small" onClick={this.handleDelete}>Delete Report</Button>
                      <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                    </Box>
                  </Box>
                  
                  
                </Popover> */}
                
              </CardActions>
            </Card>
          </Grid>
    )
  }
}

export default ReportItem

