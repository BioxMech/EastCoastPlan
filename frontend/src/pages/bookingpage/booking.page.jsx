import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import FacilitiesList from '../../components/facilityCategoryOverview/facilityCategoryOverview.component';
import Booking from '../../components/booking/booking.component';

const BookingPage =({ match }) => (
  <div>
    <Route exact path={`${match.path}`} >
      <Redirect to="/facilities" component={FacilitiesList} />
    </Route>
    <Route path={`${match.path}/:schedule_id`} component={Booking} />
  </div>
)

export default BookingPage
