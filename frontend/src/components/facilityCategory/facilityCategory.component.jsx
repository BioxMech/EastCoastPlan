import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const FacilityCategory = ({facility}) => (
  <Paper elevation={5}>
    <Card >
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          alt={ facility.schedule_name }
          height="140"
          image= { facility.image_url }
          title={ facility.schedule_name }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { facility.schedule_name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary" href={"/facilities/" + facility.schedule_id }>
          Explore More { facility.schedule_name }
        </Button>
      </CardActions>
    </Card>
  </Paper>
)

export default FacilityCategory