import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import SignUp from '../../components/signup/signup.component';
import SignIn from '../../components/signin/signin.component';

class SignInSignUp extends React.Component {

  render() {
    return (
      // <Container>
        <Box my={3} mx={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SignUp />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SignIn />
            </Grid>
          </Grid>
        </Box>
      // </Container>
    )
  }
}

export default SignInSignUp