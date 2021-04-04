import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import './facilityItem.styles.scss';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const FacilityItem = ({facility}) => (
  <Paper elevation={5} className="content">
    <Box mx={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img src={ facility.image_url } className="image" alt="...Loading" />
        </Grid>
        <Grid item xs={12} sm={8} className="description">
          <ThemeProvider theme={theme}>
            <Typography variant="h4">{ facility.facility_name }</Typography>
            <Typography variant="h6" className="location">{ facility.location }</Typography>
            <Typography variant="h6">SGD${ facility.price }</Typography>
          </ThemeProvider>
          <Button size="small" variant="contained" color="primary" href={window.location.pathname + "/" + facility.facility_name}>
            BOOK
          </Button>
          
        </Grid>
      </Grid>
    </Box>
    
  </Paper>
)

export default FacilityItem