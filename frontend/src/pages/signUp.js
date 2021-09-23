import React, { Component } from 'react';

import * as yup from 'yup';
import Validation from './validation';

export class SignUp extends Component {
  state = {
    page: 1,
    role: 0,  // ["athlete", "trainer", "admin"]
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
    goals: ''  // ["lose", "maintain", "build"]
  }


  defaultValue = {
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


  schemaPage1 = yup.object().shape({
    role: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    dob: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  })

  schemaPage2 = yup.object().shape({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.number().required().positive().integer(),
  })

  schemaPage3 = yup.object().shape({
    height: yup.number().required().positive().integer(),
    weight: yup.number().required().positive().integer(),
    gender: yup.string().required(),
    goals: yup.string().required(),
  })

  nextPage = () => {
    const { page } = this.state
    this.setState({ page: page + 1 })
  }

  previousPage = () => {
    const { page } = this.state
    this.setState({ page: page - 1 })
  }

  setUserInput = (property, val) => {
    this.setState({...this.state, [property]: val})
  }


  render() {
    const { page } = this.state;
    switch (page) {
      default:
      case 1:
        return (
          <div>
            <Validation
            page = {page}
            nextPage = {this.nextPage}
            setUserInput = {this.setUserInput}
            schema = {this.schemaPage1}
            flag = {true}
            ></Validation>
          </div>
        )
      case 2:
        return (
          <div>
            <Validation
            page = {page}
            nextPage = {this.nextPage}
            setUserInput = {this.setUserInput}
            schema = {this.schemaPage2}
            flag = {true}
            ></Validation>
          </div>
        )
      case 3:
        return (
          <div>
            <Validation
            page = {page}
            nextPage = {this.nextPage}
            setUserInput = {this.setUserInput}
            schema = {this.schemaPage3}
            ></Validation>
          </div>
        )
    }
  }
}

export default SignUp;