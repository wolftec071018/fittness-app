import React, {useEffect, useState} from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "../components/sidebar";
import WorkoutService from "../../services/workout.service";
import DashboardNav from "../components/dashboardNav";
import AthleteSidebar from "../athlete/athleteSidebar";
import TrainerService from "../../services/trainer.service";
import TopNavbar from "./topNavTW";

var DATA_LOADED = false;

function Home() {

  const [workouts, setWorkouts] = useState([]);

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();


  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  useEffect(() => {
    async function fetchData() {
      const res = await WorkoutService.getAll();
      console.log(res.data);
      setWorkouts(res.data);
      DATA_LOADED = true;
    }
    if (!DATA_LOADED) {
      fetchData().then(() => console.log("data loaded"));
    }
  }, [workouts]);

  return (
    <div>
      <TopNavbar/>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <AthleteSidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Card className="text-center">
            <Card.Header>Welcome, today is {date}</Card.Header>
            <Card.Body>
              <Card.Title>It is {time}</Card.Title>
              <Card.Text>Lets start your workout!</Card.Text>
              <Button variant="primary">Workouts</Button>
            </Card.Body>
            <Card.Footer className="text-muted" />
          </Card>
          <div className={'my-5'}>
            <h1>Workouts</h1>
            {workouts.map((workout, idx) => {
              return (
                  <button className={'btn btn-outline-primary'} key={idx}>
                    <p>Workout name: {workout.name}</p>
                    <p>Start date: {workout.startDate} | End date: {workout.endDate}</p>
                    <p>Sets: {workout.sets} | Rest: {workout.rest? workout.rest : "None"}</p>
                  </button>
              )
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;

