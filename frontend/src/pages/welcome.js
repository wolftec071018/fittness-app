import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from './components/header'
import NavBar from './components/mainNavBarTW';

function Welcome() {
  return (<div className="welcomebg min-h-screen">
    <NavBar />
    {/* <Header>
    </Header> */}
    
      <h1>Fitness Workout Log</h1>
      <p>
        Reach your personal goals.
        Get connected with a trainer today.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>

  </div>);
}

export default Welcome;