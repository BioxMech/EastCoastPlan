import React from 'react';
import { Route } from 'react-router-dom';

import FacilitiesList from '../../components/facilityCategoryOverview/facilityCategoryOverview.component';
import Facility from '../../components/facility/facility.component';
import Booking from '../../components/booking/booking.component';

const Facilities =({ match }) => (
  <div>
    <Route exact path={`${match.path}`} component={FacilitiesList} />
    <Route exact path={`${match.path}/:schedule_id`} component={Facility} />
    <Route path={`${match.path}/:schedule_id/booking/:facility_id`} component={Booking} />
  </div>
)

export default Facilities
