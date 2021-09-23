import { Card, ListGroupItem, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

function UserCard(props) {
  const { athlete } = props;

  console.log(athlete.name);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{athlete.name} </Card.Title>
        <Card.Text>{athlete.email}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Member since: {new Date(athlete.createdAt).toDateString()}</ListGroupItem>
        <ListGroupItem>Personal Info</ListGroupItem>
        <ListGroupItem>Location</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Link to={{pathname: "/sendWorkout", state: athlete}}>
          <Card.Link>Send Workout</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
