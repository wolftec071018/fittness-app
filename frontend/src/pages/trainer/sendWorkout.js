import React, { Fragment, useEffect, useState } from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import ModifyCard from '../trainer/modifyCard'
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";

import WorkoutService from '../../services/workout.service';
import ExerciseService from '../../services/exercise.service';
import PredefineService from '../../services/predefine.service';

import TrainerSidebar from './trainerSidebar'

const defaultValue = {
    startDate: null,
    endDate: null,
    exercises: [],
    athlete: null,
};

function SendWorkout(props) {
    const [workouts, setWorkoutList] = useState([]);
    const [exercises, setExerciseList] = useState([]);
    const [selected, setSelected] = useState(defaultValue);
    const history = useHistory();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState(0);
    const [currWorkout, setCurrWorkout] = useState(null);  //change the name later

    const handleClose = () => {
        setShow(false);
        workouts[pos].exercises = exercises
       
    }

    const handleShow = ((index, workout) => {
        setExerciseList(JSON.parse(JSON.stringify(
            workout.exercises)));
        setCurrWorkout(workout);
        setPos(index);
        setShow(true);
    });

    const handleSend = (() => {
        const start = date[0].startDate
        const end = date[0].endDate
        selected.startDate = start.toISOString()
        if (end) {
            selected.endDate = end.toISOString()
        }

        selected.exercises.forEach(async workout => {
            console.log(workout.name);
            const res = await WorkoutService.create(
                1, //passed athlete id dunno
                workout.name,
                workout.sets,
                selected.startDate,
                selected.endDate,
                workout.rest
            );

            const createdWorkout = res.data;

            console.log("Workout created with id:", createdWorkout.id)

            workout.exercises.forEach(exercise => {
                return ExerciseService.create(
                    createdWorkout.id,
                    exercise.name,
                    exercise.reps,
                    exercise.weight,
                    exercise.units
                    );
            })
        });

        console.log("Workouts created");
        window.alert("Workouts Created!");
    });

    useEffect(() => {
        async function fetchData() {
            const res = await PredefineService.initial();
            if (res) {
                setWorkoutList(res.data);
            }
            else {
                window.alert("Server Error")
            }
        }
        fetchData().then(() => console.log('success'));
    }, []);

    // const selectedWorkout = (exercise) => {
    //     const values = [...selected.exercises]
    //     if (values.findIndex(({id}) => id === exercise.id) === -1) {
    //         values.push(exercise)
    //         setSelected({...selected, exercises: values});
    //     } else {
    //         values.splice(values.findIndex(({id}) => id === exercise.id), 1);
    //         setSelected({...selected, exercises: values});
    //     }
    // };

    const handleInput = (idx, event) => {
        
       
        if (event.target.name === "exerciseName") {
            currWorkout.exercises[idx].name  = event.target.value;
        } else if (event.target.name === "weight") {
            currWorkout.exercises[idx].weight = event.target.value;
        } else if (event.target.name === "reps") {
            currWorkout.exercises[idx].reps = event.target.value;
        } else if (event.target.name === "sets") {
            currWorkout.exercises[idx].sets = event.target.value;
        } else if (event.target.name === "rest") {
            currWorkout.exercises[idx].rest = event.target.value;
        }
        
        setCurrWorkout({...currWorkout});
    }

    const saveChanges = () => {
        setShow(false);
        selected.exercises.push(currWorkout);
    }

    const cancelChanges = () => {
        workouts[pos].exercises = [...exercises]
    }

    return (
        <div className={'flex'}>
              <TrainerSidebar />
              <div className = "ml-56">
            <div>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
        </div>

                <h1 className="my-5">Workouts</h1>
                <Container className="container-fluid">
                    <Row>
                        {workouts.map((workout, index) => {
                            return (
                                <Fragment key={`${workout}~${index}`}>
                                    <Col>
                                        <Row>
                                            <ModifyCard
                                                workout={workout}
                                                key={workout._id}
                                            />
                                        </Row>
                                        <Row className="my-3">
                                            
                                            <Button variant="primary" onClick={() => handleShow(index, workout)}>
                                                +
                                            </Button>
                                            
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> {currWorkout? currWorkout.name: ""} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/*{exercises.map((exercise, index) => {*/}
                            {currWorkout? currWorkout.exercises.map((exercise, index) => {
                                return (
                                    <Form key={index}>
                                        <Form.Group>
                                            <Form.Label>Exercise Name: </Form.Label>
                                            <Form.Control
                                                name="exerciseName" type="text"
                                                      value={exercise.name}
                                                      placeholder="exercise name"
                                                      onChange={(event) => handleInput(index, event)}/>
                                            <Form.Label>Weights: </Form.Label>
                                            <Form.Control
                                                name="weight"
                                                type="text"
                                                value={exercise.weight} placeholder="weight"
                                                onChange={(event) => handleInput(index, event)}/>
                                            <Form.Label>Reps: </Form.Label>
                                            <Form.Control
                                                name="reps"
                                                type="text"
                                                value={exercise.reps}
                                                placeholder="reps"
                                                onChange={(event) => handleInput(index, event)}/>
                                            <Form.Label>Sets: </Form.Label>
                                            <Form.Control
                                                name="sets"
                                                type="text"
                                                value={exercise.sets}
                                                placeholder="sets"
                                                onChange={(event) => handleInput(index, event)}/>
                                            <Form.Label>Rests: </Form.Label>
                                            <Form.Control
                                                name="rest"
                                                type="text"
                                                value={exercise.rest}
                                                placeholder="rest"
                                                onChange={(event) => handleInput(index, event)}
                                            />
                                        </Form.Group>
                                    </Form>
                                )
                            }) : ""}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={saveChanges}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                                        </Row>
                                    </Col>
                                </Fragment>
                            )
                        })}
                    </Row>

                </Container>
                <Button onClick={handleSend}>
                    Send
                </Button>
            </div>
        </div>
    );
}

export default SendWorkout;