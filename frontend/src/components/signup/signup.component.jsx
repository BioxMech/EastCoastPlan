import React from 'react';
import { Paper, FormControl, InputLabel, Input, FormHelperText, Box, Button, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';

class SignUp extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      acc_type: '',
      disabled: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    
  }

  handleSubmit(event) {
    event.preventDefault()
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
                <Input id="my-input" aria-describedby="my-helper-text"  type="email" value={this.state.email}  required />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl required >
                <InputLabel htmlFor="my-input" >Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text"  type="password" value={this.state.password} required />
                <FormHelperText id="my-helper-text">Your password will be encrypted.</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <RadioGroup row aria-label="user" name="position" defaultValue="top" value={this.state.acc_type}>
                <FormControlLabel value="user" control={<Radio color="primary" />} label="User" />
                <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
              </RadioGroup>
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
          </form>
        </Box>
      </Paper>

    )
  }
}

export default SignUp