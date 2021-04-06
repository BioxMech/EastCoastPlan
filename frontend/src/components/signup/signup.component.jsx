import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Paper, FormControl, InputLabel, Input, FormHelperText, Box, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      acc_type: 'user',
      disabled: true,
      show: false,
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }


  handleEmail(event) {
    this.setState({email: event.target.value})
    if (this.state.password != '') {
      this.setState({disabled: false})
    }
  }

  handlePassword(event) {
    this.setState({password: event.target.value})
    if (this.state.email != '') {
      this.setState({disabled: false})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({loading:true})
    var email = event.target[0].value
    var password = event.target[1].value
    var acc_type = this.state.acc_type
    var json = { 
      password: password, 
      account_type: acc_type 
    }
    axios.post(`http://localhost:5001/users/${email}`, json)
      .then(response => {
        localStorage.setItem("email", email)
        localStorage.setItem("acc_type", acc_type)
        // this.props.history.push('/facilities');
        window.location.reload(false)
      })
      .catch(error => {
        if (error.response.status == 400) {
          this.setState({show:true, disabled:true, loading: false})
        }
      })
  }
  
  render() {
    return(
      <Paper elevation={3}>
        <Box ml={3} py={3}>
          <h1>Registration</h1>
          <form onSubmit={this.handleSubmit}>
            <Box>
              <FormControl required >
                <InputLabel htmlFor="my-input" >Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text"  type="email" onChange={this.handleEmail} required />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl required >
                <InputLabel htmlFor="my-input" >Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text"  type="password" onChange={this.handlePassword} required />
                <FormHelperText id="my-helper-text">Your password will be encrypted.</FormHelperText>
              </FormControl>
            </Box>
            <Box mt={3}>
            {
              this.state.loading ?
              <Fade
                in={this.state.loading}
                style={{
                  transitionDelay: this.state.loading ? '300ms' : '0ms',
                }}
                unmountOnExit
              >
                <Button variant="contained" disabled>SIGN UP <CircularProgress size="25px" style={{marginLeft:"10px"}} /></Button>
              </Fade>
              :
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.state.disabled}
              >
                SIGN UP
              </Button>
            }
              
            </Box>
            {
              this.state.show ?
              <Box>
                Email Exist
              </Box>
              :
              <span></span>
            }
          </form>
        </Box>
      </Paper>

    )
  }
}

export default withRouter(SignUp)