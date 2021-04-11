import React from 'react';

import ECP_Pic from '../../assets/pictures/ecp.jpeg'

class AboutUs extends React.Component {

  render() {
    return (
      <div style={{textAlign:"center", }}>
      <h1>Model EastCoastPlan Founder</h1>
      <p><img style={{width: "30%"}} src={ECP_Pic} alt="...EastCoastPlan loading" /></p>
      </div>
    )
  }
}

export default AboutUs
