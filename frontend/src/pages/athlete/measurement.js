import React, {useState} from "react";

import DashboardNav from "../components/dashboardNav";
import MeasurementService from '../../services/measurements.service';
import AthleteSidebar from "./athleteSidebar";
// import TopNavbar from "./topNavTW";

function Measurement() {
    const [bodyPart, setBodyPart] = useState("abs");  //using the state of defaultValue
    const [side, setSide] = useState();
    const [measure, setMeasure] = useState();
    const [latest, setLatest] = useState();
    const [showInfo, setShowInfo] = useState('none');
    const [showOptional, setShowOptional] = useState('none');

    const valuesWithSides = ['biceps', 'quads', 'chest', 'calf', 'forearm']

    async function handleSubmit(ev) {
        ev.preventDefault();
        console.log("in submit");
        console.log("BP:", bodyPart);
        console.log("Side:", side);
        console.log("Measure:", measure);

        const actualSide = side? side : "NA";

        MeasurementService.create(bodyPart, actualSide, measure).then(
            res => {
                if (res.status === 201) {
                    setLatest(null);
                    setSide(null);
                    setBodyPart('abs');
                    window.alert("Looking good\nMeasurement recorded");
                }
                else {
                    window.alert("Error: " + res.status);
                }
            },
            err => {
                console.log(err.message)
            })
    }

    function handleBodyPart(e) {
        setShowInfo('none');
        console.log("In handleBodyPart");
        const bp = e.target.value;
        console.log(bp);
        setBodyPart(bp);
        if (valuesWithSides.includes(bp)) {
            setShowOptional('block');
        }
        else {
            setShowOptional('none');
            handleLatest(bp, null);
        }
    }

    function handleSide(e) {
        console.log("In handle side");
        const bp =  bodyPart;
        const sd = e.target.value;
        console.log(sd);
        setSide(sd);
        handleLatest(bp, sd);
    }

    async function handleLatest(bp, sd) {

        console.log("in handle latest");

        MeasurementService.getLatest(bp, sd).then(
            res => {
                const last = res.data;
                console.log('Latest', last);
                setLatest(last);

                if (last) {
                    setShowInfo('block');
                }
                else {
                    setShowInfo('none');
                }
            },
            err => {
                console.log(err.message);
            }
        )
    }

    return (
        <div className="welcomebg min-h-screen">
            {/* <TopNavbar/> */}
            <AthleteSidebar/>
            <h1 className={'my-5'}>Body Measurements</h1>
            <form className="flex items-center justify-center py-4" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">Which body part would you like to track?</h6>
                        <div>
                            <select className={'form-control my-4'} defaultValue={bodyPart}
                                    onChange={handleBodyPart}>
                                <option value="biceps">Biceps</option>
                                <option value="quads">Quads</option>
                                <option value="waist">Waist</option>
                                <option value="chest">Chest</option>
                                <option value="hips">Hips</option>
                                <option value="calf">Calf</option>
                                <option value="gluts">Gluteus Maximus</option>
                                <option value="back">Back</option>
                                <option value="shoulders">Shoulders</option>
                                <option value="forearm">Forearm</option>
                                <option value="abs">Abs</option>
                            </select>
                        </div>
                        <div style={{ display: showOptional }} onChange={handleSide}>
                            <select className={'form-control my-4'} defaultValue={'both'}>
                                <option value={"both"}>Both</option>
                                <option value={"left"}>Left</option>
                                <option value={"right"}>Right</option>
                            </select>
                        </div>
                        <div>
                            <input
                                className={'form-control'}
                                placeholder={"measurement in inches"}
                                onChange={(ev => {setMeasure(ev.target.value)})}
                            />
                        </div>
                        <button
                            type={'submit'}
                            className={'btn btn-lg btn-success mt-4'}
                        >
                            Add +
                        </button>
                    </div>
                </div>
            </form>
            <div className={'card my-5'} style={{ display: showInfo }}>
                <div>
                    <p>You latest measurement for {latest?.bodyPartName} was: {latest?.measurements[0].circumference}</p>
                    <p>On {new Date(latest?.measurements[0].createdAt).toDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Measurement;
