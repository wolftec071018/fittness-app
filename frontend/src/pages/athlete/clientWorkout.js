import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../components/inputField";
import DashboardNav from "../components/dashboardNav";
import UpdateService from "../../services/update.service";
import TopNavbar from "./topNavTW";
const defaultValue = {
  Date: "",
  Workout: "",
  height: "",
  gender: "",
};

function ClientWorkout() {
  const [form, setForm] = useState(defaultValue);

  const handleEdit = () => {
    const goalType = form.goalType;
    const currentWeight = form.currentWeight;
    const goalWeight = form.goalWeight;
    const height = form.height;

    // TODO they are not strings
    // TODO try and get the string values and then pass to
    // TODO update service
    console.log(goalType);
    console.log(currentWeight);
    console.log(goalWeight);
    console.log(height);

    UpdateService.updateGoals(goalType, currentWeight, goalWeight, height).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.message);
      }
    );
  };

  function setInputValue(property, val) {
    setForm({ ...form, [property]: val });
  }

  return (
    <div>
      <TopNavbar />

      <h1>Today's Workout</h1>
      <h3>Assign on 3/28/2021</h3>


      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control as="select">
          <option>Shoulders</option>
          <option>Back</option>
          <option>Legs</option>
          <option>Glutes</option>
          <option>+</option>
        </Form.Control>
      </Form.Group>

      <h5>dumbbell lateral raise</h5>

      <Form>
        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="rec weight:10lb"
              value={form.recommendedWeight ? form.recommendedWeight : ""}
              onChange={(val) => setInputValue("recommendedWeight", val)}
            />
            {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Workout Done" />
            </Form.Group> */}
          </Col>

          <Col>
            <InputField
              type="text"
              placeholder="recommended reps:10"
              value={form.reps ? form.reps : ""}
              onChange={(val) => setInputValue("reps", val)}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              placeholder="recommended sets: 5"
              value={form.sets ? form.sets : ""}
              onChange={(val) => setInputValue("sets", val)}
            />
          </Col>
        </Row>

        <h5>forward/front dumbell raise</h5>

        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="rec weight:10lb"
              value={form.recommendedWeight2 ? form.recommendedWeight2 : ""}
              onChange={(val) => setInputValue("recommendedWeight2", val)}
            />
          </Col>

          <Col>
            <InputField
              type="text"
              placeholder="recommended reps:10"
              value={form.reps2 ? form.reps2 : ""}
              onChange={(val) => setInputValue("reps2", val)}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              placeholder="recommented sets:5"
              value={form.sets2 ? form.sets2 : ""}
              onChange={(val) => setInputValue("sets2", val)}
            />
          </Col>
        </Row>

        <h5>scarecrow</h5>

        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="rec weight:10lb"
              value={form.recommendedWeight3 ? form.recommendedWeight3 : ""}
              onChange={(val) => setInputValue("recommendedWeight3", val)}
            />
          </Col>

          <Col>
            <InputField
              type="text"
              placeholder="recommended reps:10"
              value={form.reps3 ? form.reps3 : ""}
              onChange={(val) => setInputValue("reps3", val)}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              placeholder="recommended sets:5"
              value={form.sets3 ? form.sets3 : ""}
              onChange={(val) => setInputValue("sets3", val)}
            />
          </Col>
        </Row>
        <h5>seated rear lateral dumbell raise</h5>

        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="rec weight:10lb"
              value={form.recommendedWeight4 ? form.recommendedWeight4 : ""}
              onChange={(val) => setInputValue("recommendedWeight4", val)}
            />
          </Col>

          <Col>
            <InputField
              type="text"
              placeholder="recommended reps:10"
              value={form.reps4 ? form.reps4 : ""}
              onChange={(val) => setInputValue("reps4", val)}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              placeholder="recommended sets:5"
              value={form.sets4 ? form.sets4 : ""}
              onChange={(val) => setInputValue("sets4", val)}
            />
          </Col>
        </Row>
        <h5>upright dumbbell row</h5>

        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="rec weight:10lb"
              value={form.recommendedWeight5 ? form.recommendedWeight5 : ""}
              onChange={(val) => setInputValue("recommendedWeight5", val)}
            />
          </Col>

          <Col>
            <InputField
              type="text"
              placeholder="recommended reps:10"
              value={form.reps5 ? form.reps5 : ""}
              onChange={(val) => setInputValue("reps5", val)}
            />
          </Col>
          <Col>
            <InputField
              type="text"
              placeholder="recommended sets:5"
              value={form.sets5 ? form.sets5 : ""}
              onChange={(val) => setInputValue("sets5", val)}
            />
          </Col>
        </Row>

        {/* <InputField
          type="text"
          placeholder="goalType"
          value={form.goalType ? form.goalType : ""}
          onChange={(val) => setInputValue("goalType", val)}
        /> */}

        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleEdit();
            
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ClientWorkout;
