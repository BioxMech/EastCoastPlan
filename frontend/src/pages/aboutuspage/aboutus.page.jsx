import React from 'react';

import ECP_Pic from '../../assets/pictures/ecp.jpeg'

class AboutUs extends React.Component {

  render() {
    return (
      <div style={{textAlign:"center", }}>
      <h1>Model EastCoastPlan Developer</h1>
      <p><img src={ECP_Pic} alt="...EastCoastPlan loading" /></p>
      </div>
    )
  }
}

export default AboutUs
