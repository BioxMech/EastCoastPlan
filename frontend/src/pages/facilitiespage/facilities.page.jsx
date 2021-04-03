import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FacilitiesList from '../../components/facilityCategoryOverview/facilityCategoryOverview.component';

class Facilities extends React.Component {

  render() {
    return (
      <div>
        <Container >
          <Box my={2}>
            <FacilitiesList />
          </Box>
        </Container>
      </div>
    )
  }
}

export default Facilities
