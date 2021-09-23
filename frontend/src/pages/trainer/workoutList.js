import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import WorkoutCard from '../trainer/workoutCard'

import authHeader from '../../services/auth-header';

import TrainerSidebar from './trainerSidebar'

// function WorkoutList() {
//     const [workouts, setWorkoutList] = useState([]);
//     const history = useHistory()
//     useEffect(() => {
//     //let userId = AuthService.getCurrentUser().id;
//     axios
//       .get('http://localhost:5000/api/predefined/workouts/custom/', {
//         //headers: authHeader(),
//         //userId: null,
//       })
//       .then((res) => {
//         console.log(res.data);
//         setWorkoutList(res.data);
//         console.log(workouts);
//       });
//   }, []);

function WorkoutList() {
  const [workouts, setWorkoutList] = useState([]);
  const history = useHistory()
  useEffect(() => {
      async function fetchData() {
          const s1 = await axios
              .get('http://localhost:5000/api/predefined/workouts/initial/', {
                  headers: authHeader(),
              })

          // .then((res) => {
          //   console.log(res.data);
          //   setWorkoutList(res.data);
          //   console.log(workouts);
          // });

          const s2 = await axios
              .get('http://localhost:5000/api/predefined/workouts/custom/', {
                  headers: authHeader(),
              })
          const tmp = s1.data.concat(s2.data);
          console.log(tmp);
          console.log(authHeader());
          setWorkoutList(tmp);
      }
      fetchData();
    }, []);

    return (
        <div className={'flex'}>
            <TrainerSidebar />
                <div className = "ml-56">
                    {workouts.map((workout) => (
                // <div> {JSON.stringify(workout)} </div>
                    <WorkoutCard workout={workout} key={workout._id}></WorkoutCard>
                    ))}
                    <Button onClick={(event) => {
                            event.preventDefault();
                            history.push("/createWorkout")}} variant="light"> + </Button>
                </div>
            </div>
    );
}

export default WorkoutList; 