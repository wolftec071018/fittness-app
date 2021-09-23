import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import InputField from './components/inputField';
import SubmitButton from './components/submitButton';
import Header from './components/header';



// import the auth service to get and store the token
import AuthService from '../services/auth.service';

const defaultValue = {
  email: "",
  password: "",
};

const defaultError = {
  email: '',
  password: '',
}

let schema = yup.object().shape({
  email: yup.string().email("Please put a valid email").required(),
  password: yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
});

function Login(props) {

  const [form, setForm] = useState(defaultValue)
  const [error, setError] = useState(defaultError)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const history = useHistory()


  function validate(property, val){
    yup
      .reach(schema, property)
      .validate(val)
      .then((valid) => {
        setError({...error, [property]: ''})
      })
      .catch((err) => {
        setError({...error, [property]: err.errors[0]})
      })
  }

  useEffect(() => {
    schema.isValid(form)
    .then((valid) => setButtonDisabled(!valid))
  }, [form])


  function setInputValue(property, val) {
    val = val.trim();
    if (val.length > 120) {
      //maximum length for username and password
      return false;
    }
    validate(property, val)
    setForm({ ...form, [property]: val })

  }

  function doLogin() {
    const email = form.email;
    const password = form.password;

    // easier and on success the token
    // gets stored in the local storage for later use
    AuthService.login(email, password).then(
        res => {
            if (res.role === 'trainer') {
                history.push('/TrainerDashboard');
            }
            else {
                history.push('/AthleteDashboard');
            }
        },
        err => {
            console.log(err.message)
        }
    );
  }

  return (
    <div className="login">

      <Header>
      </Header>
      login

      <InputField
        type="text"
        placeholder="email"
        value={form.email ? form.email : ""}
        onChange={(val) => setInputValue("email", val)}
      />
      {error.email.length > 0 ? <p>{error.email}</p>: null}
      <InputField
        type="password"
        placeholder="Password"
        value={form.password ? form.password : ""}
        onChange={(val) => setInputValue("password", val)}
      />
      {error.password.length > 0 ? <p>{error.password}</p>: null}
      <SubmitButton
        text="Login"
        disabled={buttonDisabled}
        onClick={() => doLogin()}
        href="/Dashboard"
      />
    </div>
  );
}


export default Login;

