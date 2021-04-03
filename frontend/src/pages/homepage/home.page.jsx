import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { spacing } from '@material-ui/system';

import MainContent from '../../components/mainContent/mainContent.component';

import './homepage.styles.scss';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Container >
          <Box my={2}>
            <MainContent />
          </Box>
        </Container>
      </div>
    )
  }
}

export default HomePage