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
            Vivamus hendrerit ipsum sit amet lectus porttitor, at auctor nibh ultrices. Maecenas mattis vehicula augue. Vestibulum accumsan lacus ac sodales vestibulum. Quisque tristique egestas metus, in consectetur ante accumsan nec. Duis vitae sapien id nunc vehicula auctor ut vel diam. In ut quam sapien. Vestibulum rutrum ornare tellus sit amet condimentum. Duis at nibh arcu. Suspendisse pharetra dictum elit, et iaculis diam mattis in. Phasellus posuere, augue quis sodales mattis, nisi felis bibendum mi, eu iaculis neque felis a odio. Donec cursus enim sem, sit amet vulputate risus euismod quis. Sed justo urna, rhoncus non consequat vitae, ultricies quis ex. Vivamus quis eros eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
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