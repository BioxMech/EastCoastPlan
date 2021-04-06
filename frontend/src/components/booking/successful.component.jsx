import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class Successful extends React.Component {


  componentDidMount() {
    setTimeout(() => {
      window.location.replace("/facilities")
    }, 5000)
  }

  render() {
    return (
      <Box m={5} >
        <Paper elevation={5} >
          <Box p={5}>
            <Typography align="center">Payment and Booking Successful!!!
            <br/>
            Redirecting to the Facilities Page in 5 seconds. Press <Link to="/facilities">here</Link> to redirect immediately</Typography>
          </Box>
        </Paper>
      </Box>
      
    )
  }
}

export default Successful