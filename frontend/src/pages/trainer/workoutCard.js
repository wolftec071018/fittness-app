import { Card } from "react-bootstrap";
import {Link} from "react-router-dom";

function WorkoutCard(props) {
  const { workout } = props;

  console.log(workout.name);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Link class="stretched-link" style={{ color: "black" }} to={{pathname: "/ViewWorkout", state: workout}}>
        {/* <a href="/" class="stretched-link" style={{ color: "black" }}>  */}
        <Card.Title>{workout.workoutName} </Card.Title>
        {/* </a> */}
        </Link>

        {/* <Card.Text>{athlete.email}</Card.Text> */}
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroupItem>some info here</ListGroupItem>
        <ListGroupItem>Personal info</ListGroupItem>
        <ListGroupItem>location</ListGroupItem>
      </ListGroup> */}
    </Card>
  );
}

export default WorkoutCard;