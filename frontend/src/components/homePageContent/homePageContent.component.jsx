import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './homePageContent.styles.scss';

import MainGif from '../../assets/video/Events.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function HomePageContent() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        className="content"
        container
        direction="row"
        justify="center"
        // alignItems="center"
      >
        <Grid item className="item">
            <h1 className="title">Explore and Book Event Spaces</h1>
            <h4 className="subtitle">BBQ Pits, Badminton Courts and more</h4>
            <p className="buttonP">
              <Button className="button" variant="contained" color="primary" href="/facilities">
                Explore Facilities
              </Button>
            </p>
            <img src={MainGif} alt="loading..." className="gif" /> 
        </Grid>
      </Grid>
    </div>
  )
}