import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import InputField from './components/inputField';
import SubmitButton from './components/submitButton';
import Header from './components/header';

// useEffect(() => {
//   this.schema.isValid(this.state)
//   .then((valid) => setButtonDisabled(!valid))
// }, [this.state])

const defaultValue = {
    role: 0,
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    password: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    height: '',
    weight: '',
    gender: '',
    goals: ''
  }

  const defaultError = {
    role: 0,
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    password: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    height: '',
    weight: '',
    gender: '',
    goals: ''
  }

  

  const Validation = (props) => {
    const {page, nextPage, setUserInput, schema} = props
    const [form, setForm] = useState(defaultValue)
    const [error, setError] = useState(defaultError)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    // const {page, nextPage, setUserInput, schema, defaultValue} = props
    const history = useHistory()

    //console.log(buttonDisabled)
    useEffect(() => {
      //const {schema} = props
      schema.isValid(form)
      .then((valid) => setButtonDisabled(!valid))
    }, [form, schema])

    const setInputValue = (property, val) => {
        //val = val.trim();
        if (val.length > 120) { //maximum length for username and password
          return;
        }
        validate(property, val)
        setForm({ ...form, [property]: val })
        setUserInput(property, val )
    }

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
  
    // useEffect(() => {
    //   schema.isValid(form)
    //   .then((valid) => setButtonDisabled(!valid))
    // }, [form])

    const doSignUp = async () => {
      const role = form.role;
      const firstname = form.firstname;
      const lastname = form.lastname;
      const dob = form.dob;
      const email = form.email;
      const password = form.password;
      const street = form.street;
      const city = form.city;
      const state = form.state;
      const zipcode = form.zipcode;
      const height = form.height;
      const weight = form.width;
      const gender = form.gender;
      const goal = form.goals;

      console.log("Do signup Func");

      var response = await axios.post(
          'http://localhost:5000/api/auth/signup/',
          {
              role, firstname, lastname, dob, email, password, gender
          })
          .catch(err => {
              console.log(err.message)
          });

      const token = response.data.token;

      response = await axios.post(
          'http://localhost:5000/api/address/update/',
          {
              street, city, state, zipcode
          },
          {
              headers: { 'x-access-token': token }
          })
          .catch(err => {
              console.log(err.message)
          });

      if (response.status !== 200) {
          // do something?
          console.log(response.status)
      }

      response = await axios.post(
          'http://localhost:5000/api/goal/update/',
          {
              height: height,
              currentWeight: weight,
              goalType: goal
          },
          {
              headers: { 'x-access-token': token }
          })
          .catch(err => {
              console.log(err.message)
          })

        if (response.status !== 200) {
            // do something?
            console.log(response.status)
        }

      window.alert("Great Success!")
      console.log("Great success")

      return history.push('/');
    
      // return axios.post(
      //   'http://localhost:5000/api/auth/signup',
      //   {
      //       role,
      //       firstname,
      //       lastname,
      //       dob,
      //       email,
      //       password,
      //       street,
      //       city,
      //       state,
      //       zipcode,
      //       height,
      //       weight,
      //       gender,
      //       goals
      //     }
      //   ).then(response => {
      //     console.log("Response given")
      //     console.log(response);
      //     history.push('/');
      //     //window.reload();
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //   })
    }

    switch (page) {
      default:
      case 1: 
        return (
          
          <div>
              <Header>
              </Header>
              <div style = {{backgroundColor: "#E9ECEF"}}>
                <input type="radio" className = "form-radio" name = "role" value="athlete" onChange={() => setInputValue('role', 'athlete')}/> 
                <span className = "mr-4"> athlete </span> 
                <input type="radio" className = "form-radio" name = "role" value="trainer" onChange={() => setInputValue('role', 'trainer')}/> 
                <span> trainer </span> 
              </div>
           
              <InputField
                type='text'
                placeholder="First Name"
                value={form.firstname ? form.firstname : ''}
                onChange={(val) => setInputValue('firstname', val)}
              />
              <InputField
                type='text'
                placeholder="Last Name"
                value={form.lastname ? form.lastname : ''}
                onChange={(val) => setInputValue('lastname', val)}
              />
              <InputField
                type='text'
                placeholder="Date of Birth"
                value={form.dob ? form.dob : ''}
                onChange={(val) => setInputValue('dob', val)}
              />
              <InputField
                type='text'
                placeholder="Email"
                value={form.email ? form.email : ''}
                onChange={(val) => setInputValue('email', val)}
              />
              <InputField
                type='text'
                placeholder="Password"
                value={form.password ? form.password : ''}
                onChange={(val) => setInputValue('password', val)}
              />
              <SubmitButton
                text='Next'
                disabled={buttonDisabled}
                onClick={() => nextPage()}
              />
            </div>
          )

    case 2:
      return(
        <div>
            <Header>
            </Header>
            <InputField
              type='text'
              placeholder="Street"
              value={form.street ? form.street : ''}
              onChange={(val) => setInputValue('street', val)}
            />
            <InputField
              type='text'
              placeholder="City"
              value={form.city ? form.city : ''}
              onChange={(val) => setInputValue('city', val)}
            />
            <InputField
              type='text'
              placeholder="State"
              value={form.state ? form.state : ''}
              onChange={(val) => setInputValue('state', val)}
            />
            <InputField
              type='text'
              placeholder="Zip Code"
              value={form.zipcode ? form.zipcode : ''}
              onChange={(val) => setInputValue('zipcode', val)}
            />
            <SubmitButton
              text='Next'
              disabled={buttonDisabled}
              onClick={() => nextPage()}
            />
          </div>
          )

    case 3:
      return (
        <div>
          <InputField
            type='text'
            placeholder="Height"
            value={form.height ? form.height : ''}
            onChange={(val) => setInputValue('height', val)}
          />
          <InputField
            type='text'
            placeholder="Weight"
            value={form.weight ? form.weight : ''}
            onChange={(val) => setInputValue('weight', val)}
          />
          <InputField
            type='text'
            placeholder="Gender"
            value={form.gender ? form.gender : ''}
            onChange={(val) => setInputValue('gender', val)}
          />
          <InputField
            type='text'
            placeholder="Goals"
            value={form.goals ? form.goals : ''}
            onChange={(val) => setInputValue('goals', val)}
          />
          <SubmitButton
            text='Submit'
            disabled={buttonDisabled}
            onClick={() => doSignUp()}
          />
        </div>
        )
    }

  }
  
export default Validation;