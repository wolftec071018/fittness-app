import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboardnav from "../components/dashboardNav";
import BodypartCard from '../athlete/bodypartCard';
import AthleteSidebar from "../athlete/athleteSidebar";

const defaultValue = {
    body:[{
        bodyPart: "",
        measurement: ""
    }]

};

const errorValue = {
    body:[{
        bodyPart: "",
        measurement: ""
    }]
};

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-'+ mm + '-' + dd;
    return today;
}

function BodyMeasurement() {
    const [measurement, setMeasurement] = useState(defaultValue);  //using the state of defaultValue
    const [user, setUser] = useState("");
    const [date, setDate] = useState(getCurrentDate());
    const history = useHistory()
    useEffect(() => {
        setUser(localStorage.getItem("jwtToken'"));
    }, []);

    // function validate(property, val){
    //   yup
    //     .reach(schema, property)
    //     .validate(val)
    //     .then((valid) => {
    //       setError({...error, [property]: ''})
    //     })
    //     .catch((err) => {
    //       setError({...error, [property]: err.errors[0]})
    //     })
    // }

    // function setInputValue(property, val) {
    //   val = val.trim();
    //   if (val.length > 120) {
    //     //maximum length for username and password
    //     return false;
    //   }
    //   validate(property, val)
    //   setForm({ ...form, [property]: val })

    // }


    // const handleAdd = () => {
    //   const values = [...measurement.body]
    //   values.push({
    //       bodyPart: "",
    //       measurement: ""
    //   })
    //   setMeasurement({ ...measurement, body: values });
    // }

    // const handleDelete = (index) => {
    //   const values = [...measurement.body]
    //   values.splice(index, 1);
    //   setMeasurement({ ...measurement, body: values });
    // }

    const handleSubmit = (e) => {
        console.log("measurement", measurement);
    };


    const setMeasurementValue = (index, event)  => {  //updates on change
        const values = [...measurement.body]

        if (event.target.name === "bodyPart") {
            values[index].bodyPart = event.target.value;
        }
        else if (event.target.name === "measurement") {
            values[index].measurement = event.target.value;
        }
        setMeasurement({ ...measurement, body: values });
    }

//   function doCreateMeasurement() {
//     const body = measurement.body
//     return axios.post(
//       'http://localhost:5000/api/predefined/workouts/create/',
//        {
//           body
//         }
//       ).then(response => {
//         console.log("Response given")
//         console.log(response);
//         history.push('/');
//         //window.reload();
//       })
//       .catch(err => {
//         console.log(err.message);
//       })
//   }
    console.log(date);
    return (
        <div className="welcomebg min-h-screen">
             <AthleteSidebar />
            <Dashboardnav />
            <h1>Body Measurements</h1>
            <div className="flex items-center justify-center py-4">
                <input type="date" id="date" className="rounded-lg" value={date} max={getCurrentDate()} onChange={(event)=> setDate(event.target.value)} />
            </div>
            <div class="grid grid-cols-2 gap-y-4 justify-center items-center px-24">
                <div>
                    <BodypartCard title="shoulders" date={date} />
                </div>
                <div>
                    <BodypartCard title="titties" date={date}/>
                </div>
                <div>
                    <BodypartCard title="left bicep" date={date}/>
                </div>
                <div>
                    <BodypartCard title="right bicep" date={date}/>
                </div>
                <div>
                    <BodypartCard title="left forearm" date={date}/>
                </div>
                <div>
                    <BodypartCard title="right forearm" date={date}/>
                </div>
                <div>
                    <BodypartCard title="hips" date={date}/>
                </div>
                <div>
                    <BodypartCard title="waist" date={date}/>
                </div>
                <div>
                    <BodypartCard title="left thigh" date={date}/>
                </div>
                <div>
                    <BodypartCard title="right thigh" date={date}/>
                </div>
                <div>
                    <BodypartCard title="left calf" date={date}/>
                </div>
                <div>
                    <BodypartCard title="right calf" date={date}/>
                </div>

                {/* <BodypartCard id="shoulders" /> */}
                {/* <BodypartCard id="shoulders" /> */}
            </div>
        </div>
    );
}

export default BodyMeasurement;
