import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../components/inputField";
import DashboardNav from "../components/dashboardNav";
import axios from 'axios';

import authHeader from "../../services/auth-header";

const defaultValue = {
  workout: "",
  exercises: [{
    name: "",
    weight: "",
    sets: "",
    reps: "",
    rest: ""
  }]
};

const errorValue = {
  workout: "",
  exercises: []
};

const exerciseObject = {
  name: "",
  weight: "",
  sets: "",
  reps: "",
  rest: ""
};

function CreateWorkout() {
  const [exercise, setExercise] = useState(defaultValue);
  const [form, setForm] = useState(defaultValue);
  const history = useHistory()

  const handleAdd = () => { //the plus sign
    const values = [...exercise.exercises]
    values.push({ 
      name: "",
      weight: "",
      sets: "",
      reps: "",
      rest: ""
    })
    setExercise({ ...exercise, exercises: values });
  }

  const handleDelete = (index) => { //when delete
    const values = [...exercise.exercises]
    values.splice(index, 1);
    setExercise({ ...exercise, exercises: values });
  }

  const handleSubmit = (e) => {
    console.log("exercise", exercise);
  };


  const setExerciseValue = (index, event)  => { //when user types
    const values = [...exercise.exercises]

    if (event.target.name === "name") {
        values[index].name = event.target.value;
    }
    else if (event.target.name === "weight") {
      values[index].weight = event.target.value;
    }
    else if (event.target.name === "reps") {
      values[index].reps = event.target.value;
    }
    else if (event.target.name === "sets") {
      values[index].sets = event.target.value;
    }
    else if (event.target.name === "rest") {
      values[index].rest = event.target.value;
    }
    //setExercise(values);
    setExercise({ ...exercise, exercises: values });
  }

  function setInputValue(property, val) { //only for name of workout
    setExercise({ ...exercise, [property]: val });
  }

  // function doCreateWorkout() {
  //   const workout = exercise.workout;
  //   const exercises = exercise.exercises;
  //   return axios.post(
  //     'http://localhost:5000/api/predefined/workouts/create/',
  //     {
  //         workout,
  //         exercises
  //       }
  //     ).then(response => {
  //       console.log("Response given")
  //       console.log(response);
  //       history.push('/workoutList');
  //       //window.reload();
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     })
  // }

  async function doCreateWorkout() {
    const workout = exercise.workout;
    const exercises = exercise.exercises;
    const predefined = true;

    if (predefined) {
        return axios.post(
            'http://localhost:5000/api/predefined/workouts/create/',
            {
                workout,
                exercises
            }, {
                headers: authHeader()
            })
            .then(res => {
                console.log("Response given")
                console.log(res);
                history.push('/TrainerDashboard');
            })
            .catch(err => {
                console.log(err.message);
            })

        //window.reload();

    }
    else {
        return axios.post(
            'http://localhost:5000/api/workouts/create/',
            {
                workout,
                exercises
            }
        ).then(response => {
            console.log("Response given")
            console.log(response);
            history.push('/TrainerDashboard');
            //window.location.reload();
        })
        .catch(err => {
            console.log(err.message);
        })
    }
  }

  return (
    <div>
      <DashboardNav />

      <h1>Create Workout</h1>
      <InputField
          type="text"
          placeholder="Name of Workout"
          value={exercise.workout ? exercise.workout : ""}
          onChange={(val) => setInputValue("workout", val)}
        />
       <Form> 
   
        
      {
        exercise.exercises.map((inputField, index) => 
          (
            <Fragment key={`${inputField}~${index}`}>

              <Col>
              
                <input
                  type="text"
                  name = "name"
                  id = "name"
                  placeholder = "name of exercise"
                  value={inputField.name}
                  onChange={(event) => setExerciseValue(index, event)}
                />

                <input
                  type="text"
                  name = "weight"
                  id = "weight"
                  placeholder = "weight"
                  value={inputField.weight}
                  onChange={(event) => setExerciseValue(index, event)}
                />

                <input
                  type="text"
                  name = "reps"
                  id = "reps"
                  placeholder = "reps"
                  value={inputField.reps}
                  onChange={(event) => setExerciseValue(index, event)}
                />

                <input
                  type="text"
                  name = "sets"
                  id = "sets"
                  placeholder = "sets"
                  value={inputField.sets}
                  onChange={(event) => setExerciseValue(index, event)}
                />

                <input
                  type="text"
                  name = "rest"
                  id = "rest"
                  placeholder = "rest"
                  value={inputField.rest}
                  onChange={(event) => setExerciseValue(index, event)}
                />
              <Row>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleDelete(index);
                  }}
                >
                  -
                </Button>
              </Row>

              </Col>
              
           
            </Fragment>

          )
        )
      }
      

       </Form>
       <Button
                  variant="primary"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleAdd();
                    
                  }}
                >
                  +
                </Button>


        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
            doCreateWorkout(); //maybe here?
          }}
        >
          Save
        </Button>

    </div>
  );
}

export default CreateWorkout;
