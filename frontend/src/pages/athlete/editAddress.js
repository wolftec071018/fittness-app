import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import InputField from "../components/inputField";

import UpdateService from "../../services/update.service";

const defaultValue = {
  street: "",
  city: "",
  state: "",
  zipcode: "",
};

function EditAdress() {

  const [form, setForm] = useState(defaultValue);

  const handleEdit = () => {
    const street = form.street;
    const city = form.city;
    const state = form.state;
    const zipcode = form.zipcode;

    // TODO they are not strings
    // TODO try and get the string values and then pass to
    // TODO update service
    console.log(street);
    console.log(city);
    console.log(state);
    console.log(zipcode);

    UpdateService.updateAddress(street, city, state, zipcode).then(
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
      <h3>Adress:</h3>

      <Form>
        <InputField
          type="text"
          placeholder="Street"
          value={form.street ? form.street : ""}
          onChange={(val) => setInputValue("street", val)}
        />
        <InputField
          type="text"
          placeholder="City"
          value={form.city ? form.city : ""}
          onChange={(val) => setInputValue("city", val)}
        />

        <InputField
          type="text"
          placeholder="State"
          value={form.state ? form.state : ""}
          onChange={(val) => setInputValue("state", val)}
        />
        <InputField
          type="text"
          placeholder="Zip Code"
          value={form.zipCode ? form.zipCode : ""}
          onChange={(val) => setInputValue("zipcode", val)}
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

export default EditAdress;
