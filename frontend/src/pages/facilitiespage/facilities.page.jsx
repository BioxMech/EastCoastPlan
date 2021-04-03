import React from 'react';
import { Route } from 'react-router-dom';

import FacilitiesList from '../../components/facilityCategoryOverview/facilityCategoryOverview.component';
import Facility from '../../components/facility/facility.component';

// class Facilities extends React.Component {

//   render() {
//     return (
//       <div>
//         <Container >
//           <Box my={2}>
//             <h1>Facilities</h1>
//             <FacilitiesList />
//           </Box>
//         </Container> 
//       </div>
//     )
//   }
// }

const Facilities =({ match }) => (
  <div>
    <Route exact path={`${match.path}`} component={FacilitiesList} />
    <Route path={`${match.path}/:schedule_id`} component={Facility} />
  </div>
)

export default Facilities
