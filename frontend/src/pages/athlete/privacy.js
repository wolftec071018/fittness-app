import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import InputField from "../components/inputField";

import UpdateService from "../../services/update.service";

const defaultValue = {
  privacy: null,
};

function Privacy() {
  const [form, setForm] = useState(defaultValue);
  const handleEdit = () => {
    const privacy = form.privacy;

    console.log(privacy);

    UpdateService.updatePrivacy(privacy).then(
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

      <h1>Edit Privacy Access</h1>

      <div style={{ backgroundColor: "#E9ECEF" }}>
        <input
          type="radio"
          className="form-radio"
          name="privacy"
          value="public"
          onChange={() => setInputValue("privacy", true)}
        />
        <span className="mr-4"> public </span>
        <input
          type="radio"
          className="form-radio"
          name="privacy"
          value="private"
          onChange={() => setInputValue("privacy", false)}
        />
        <span> private </span>
      </div>
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
    </div>
  );
}

export default Privacy;
