import React from "react";
import {  Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header";

function Home() {

  return (<div>
    <Header>
    </Header>
    <Jumbotron>
      <h1>Fitness Workout Log</h1>
      <p>

        Reach your personal goals.
        Get connected with a trainer today.

      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>

    </Jumbotron>

  </div>);

}

export default Home;
