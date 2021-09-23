import React, { useState, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../components/header";

import SearchService from '../../services/search.service';

function Search() {
    const [city, setCity] = useState();
    const [trainers, setTrainers] = useState([]);

    const offset = 0;

    function onSearchSubmit(ev) {
        // san francisco
        ev.preventDefault();
        console.log("city to search", city);
        SearchService.searchTrainer(city, offset).then(
            res => {
                setTrainers(res.data);
            },
            err => {
                console.log(err.message);
                window.alert("Server Error:\n" + err.message);
            }
        )
    }

    return (
        <div>
            {/*<Header></Header>*/}
            <div className={'container-fluid'}>
                <Fragment>
                    <h1>Profile Search</h1>
                    <h3>By city:</h3>
                    <Form onSubmit={onSearchSubmit}>
                        <div className={'my-5'}>
                            <input
                                className={"form-control"}
                                placeholder={"search for a trainer in your city.."}
                                onChange={ev => {
                                    const c = ev.target.value.toString().toLowerCase()
                                    setCity(c);
                                }}
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Fragment>
                {trainers.map((trainer, idx) => {
                    return (
                        <div className={'card my-3'} key={idx}>
                            <div className={'card-body'}>
                                <h3>{trainer.name}</h3>
                                <p>Age: {trainer.age}</p>
                                <p>Gender: {trainer.gender}</p>
                                <p>
                                    Active: {trainer.active?
                                        <span style={{ color: 'green' }}>Yes</span> :
                                        <span style={{ color: 'red' }}>No</span>}
                                </p>
                                <p style={{ color: 'gray' }}>Member since: {trainer.since}</p>
                            </div>
                        </div>)
                })}
            {/*<Users ids={userIdResults} onSelect={onSelect} />*/}
            {/*<Profile id={chosenUser} />*/}
            </div>
        </div>
    );
}

export default Search;
