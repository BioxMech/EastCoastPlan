import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import HomePageContent from '../../components/homePageContent/homePageContent.component';

import './homepage.styles.scss';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Container >
          <Box my={2}>
            <HomePageContent />
          </Box>
        </Container>
      </div>
    )
  }
}

export default HomePage