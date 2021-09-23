import { Card } from "react-bootstrap";

function ModifyCard(props) {
  const { workout } = props;
  
  return (
      // <Card onClick = {() => props.onClick(workout)} style={{ width: "18rem" }}>
      <Card style={{ width: "18rem" }}>
        {/*<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />*/}
        <Card.Img variant="top" src="https://www.planetfitness.com/sites/default/files/feature-image/xbreak-workout_602724.jpg.pagespeed.ic.v8byD7su-e.jpg" />
        <Card.Body>
          <Card.Title>{workout.name} </Card.Title>
        </Card.Body>
      </Card>

  );

}

export default ModifyCard;