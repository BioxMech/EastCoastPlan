import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const FacilityDetail = ({facilityInfo}) => (
  <Paper elevation={3}>
    <Card className="content">
      {/* <CardActionArea> */}
        <img src = {facilityInfo.image_url} alt="...Loading" className="image" />
        {/* <CardMedia
          image={ facilityInfo.image_url }
          title={ facilityInfo.facility_name }
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { facilityInfo.facility_name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Facility Description
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  </Paper>

  
)

export default FacilityDetail