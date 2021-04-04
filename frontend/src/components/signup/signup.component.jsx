import React from 'react';
import axios from 'axios';
import { Paper, FormControl, FormLabel, InputLabel, Input, FormHelperText, Box, Button, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';

class SignUp extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      acc_type: 'user',
      disabled: true,
      show: false
    }

    this.handleAccType = this.handleAccType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleAccType(event) {
    this.setState({acc_type: event.target.value})
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
    var email = event.target[0].value
    var password = event.target[1].value
    var acc_type = this.state.acc_type
    var json = { 
      password: password, 
      account_type: acc_type 
    }
    axios.post(`http://localhost:5001/users/${email}`, json)
      .then(response => {
        if (response.data.code == 201) {
           // ############# add local session ################
        }
        else if (response.data.code == 400) {
          this.setState({show:true})
        }
      });
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
            <Box mt={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup row aria-label="acc_type" name="acc_type" value={this.state.acc_type} onChange={this.handleAccType}>
                  <FormControlLabel value="user" control={<Radio />} label="User" />
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={3}>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.state.disabled}
              >
                SIGN UP
              </Button>
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

export default SignUp