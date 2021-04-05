import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/homepage/home.page.jsx';
import Facilities from './pages/facilitiespage/facilities.page.jsx';
import AboutUs from './pages/aboutuspage/aboutus.page.jsx';
import SignInSignUp from './pages/signinsignup/signinsignup.page';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/facilities" component={Facilities} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/signinsignup" component={SignInSignUp} />
          {/* <Route path="/booking" component={BookingPage} /> */}
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App;
