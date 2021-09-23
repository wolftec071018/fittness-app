import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import InputField from "../components/inputField";

import UpdateService from "../../services/update.service";

const defaultValue = {
  goal: "",
  weight: "",
  height: "",
  gender: "",
};

function EditPersonal() {

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
      <Header></Header>

      <h1>Edit Profile information</h1>
      <h3>Personal info:</h3>

      <Form>
        <InputField
          type="text"
          placeholder="Height"
          value={form.height ? form.height : ""}
          onChange={(val) => setInputValue("height", val)}
        />
        <InputField
          type="text"
          placeholder="Current weight"
          value={form.currentWeight ? form.currentWeight : ""}
          onChange={(val) => setInputValue("currentWeight", val)}
        />

        <InputField
          type="text"
          placeholder="Weight Goal"
          value={form.goalWeight ? form.goalWeight : ""}
          onChange={(val) => setInputValue("goalWeight", val)}
        />
        <InputField
          type="text"
          placeholder="goalType"
          value={form.goalType ? form.goalType : ""}
          onChange={(val) => setInputValue("goalType", val)}
        />

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

export default EditPersonal;
