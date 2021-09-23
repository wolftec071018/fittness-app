//feedback
//ask questions
//request features
//report bugs
//etc. maybe general comments?
import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import InputField from "./components/inputField";
import Header from "./components/header";
import { Button } from "react-bootstrap";

const defaultValue = {
    type: '',
    subjectLine: '',
    description: ''
}

// const errorValue = {
//     type: '',
//     subjectLine: '',
//     description: ''
// }

function CustomerSupport() {
  // const [feedback, setInputField] = useState(defaultValue);
  const [form, setForm] = useState(defaultValue);
  // const history = useHistory()

  const setCustomerInput = (property, val) => {
    setForm({ ...form, [property]: val });
    console.log(form)
  }

  return (
      <div>

        <Header></Header>

        <InputField
            type="text"
            placeholder="type"
            value={form.type ? form.type : ""}
            onChange={(val) => setCustomerInput("type", val)}
        />

        <InputField
            type="text"
            placeholder="subjectLine"
            value={form.subjectLine ? form.subjectLine : ""}
            onChange={(val) => setCustomerInput("subjectLine", val)}
        />

        <InputField
            type="text"
            placeholder="description"
            value={form.description ? form.description : ""}
            onChange={(val) => setCustomerInput("description", val)}
        />

        {/* <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text>Message</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup> */}

        <Button
            variant="primary"
            type="submit"
            onClick={(event) => {
                event.handleCustomerInput();
            }}
        >
        Submit
        </Button>
    </div>
  );
}

export default CustomerSupport;