import React, { useState } from "react";
import { Button,InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/header";
import EmailService from "../../services/email.service";
import InputField from "../components/inputField";

import TrainerSidebar from './trainerSidebar'

const defaultValue = {
  email: "",
};

function EmailInvite() {
  const [form, setForm] = useState(defaultValue);

  const handleEmail = () => {
    const email = form.email;
    console.log(email);

    EmailService.emailInvite(email).then(
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
       
      <TrainerSidebar />
      {/* <Header></Header> */}
      <div className = "ml-56">
         <Header></Header>
  
      <InputField
        type="text"
        placeholder="email"
        value={form.email ? form.email : ""}
        onChange={(val) => setInputValue("email", val)}
      />

      <InputGroup>
        <InputGroup.Prepend>
        <InputGroup.Text>Message</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as="textarea" aria-label="With textarea" />
      </InputGroup>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          handleEmail();
        }}
      >
        Send Invite
      </Button>
      </div>

      </div>
  );
}

export default EmailInvite;