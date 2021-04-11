import React from 'react';
import axios from 'axios';

class Report extends React.Component {

  constructor() {
    super()
    this.state = {
      reportList: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/reports`)
      .then(response => {
        this.setState({ reportList: response.data.data.reports })
        console.log(response.data.data.reports)
      });    
  }

  render() {
    return(
      <div>
        TABLE OF REPORT
      </div>
    )
  }
}

export default Report