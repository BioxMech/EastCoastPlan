import React from 'react';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

import pit1 from '../../assets/pictures/pit1.jpg';
import pit2 from '../../assets/pictures/pit2.jpg';

function Item(props)
{
    return (
      <Paper>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
          <img src={props.item.imgURL} />
          <Button className="CheckButton">
              Check it out!
          </Button>
      </Paper>
    )
}

class CarouselComponent extends React.Component {

  render() {

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            imgURL: pit1
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            imgURL: pit2
        }
    ]


    return (
      <div>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
      </div>

    )
  }
}

export default CarouselComponent