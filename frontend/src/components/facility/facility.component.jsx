import React from 'react';
import axios from 'axios';

class Facility extends React.Component {

  constructor() {
    super();
    this.state = {
      facility: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/${window.location.pathname}`)
    .then(res => {
      const facility = res.data.data.resources;
      this.setState({ facility });
      console.log(this.state.facility)
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Facility