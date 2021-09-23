import * as yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const defaultValue = {
    bodyPart: '',
    measurement: ''
}

const defaultError = {
    bodyPart: '',
    measurement: ''
}

let schema = yup.object().shape({
    measurement: yup.number().required().positive().integer().typeError('must be a number')

});

function BodypartCard({ title, date }) {
    const [form, setForm] = useState(defaultValue)
    const [error, setError] = useState(defaultError)

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

    function setInputValue(property, val) {
        console.log(val);
        validate(property, val.target.value)
        
        setForm({ ...form, [property]: val.target.value })
    
    }

    async function doBodypart(event) {
        const bodyPart = event.target.id;
        const measurement = form.measurement;
        console.log(bodyPart, measurement, date);
        event.preventDefault();

        const s1 = await axios
            .post('http://localhost:5000/api/progress/create/', {
                headers: authHeader(),
                bodyPart: bodyPart
            })
            .then((res) => {
                console.log(res.data);
            });
          
                // const s2 = await axios
                //     .post('http://localhost:5000/api/athlete/:athleteId/measurement/add/', {
                //         headers: authHeader(),
                //     })
    }         
        // easier and on success the token
        // gets stored in the local storage for later use
    //     AuthService.login(email, password).then(
    //         res => {
    //             if (res.role === 'trainer') {
    //                 history.push('/TrainerDashboard');
    //             }
    //             else {
    //                 history.push('/AthleteDashboard');
    //             }
    //         },
    //         err => {
    //             console.log(err.message)
    //         }
    // );

    return (
        <form id={title} onSubmit={doBodypart}>
    <div class="flex w-72">
    <div class="bg-mygray-500 border-8 border-myblue-500 rounded-lg">
        <div class="w-72 rounded-lg flex">
        <div class="w-1/5 pt-6 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 bg-myblue-500 text-white p-3 rounded-full" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path xmlns="http://www.w3.org/2000/svg" d="M12 4.52765C9.64418 2.41689 6.02125 2.49347 3.75736 4.75736C1.41421 7.1005 1.41421 10.8995 3.75736 13.2426L10.5858 20.0711C11.3668 20.8521 12.6332 20.8521 13.4142 20.0711L20.2426 13.2426C22.5858 10.8995 22.5858 7.1005 20.2426 4.75736C17.9787 2.49347 14.3558 2.41689 12 4.52765ZM10.8284 6.17157L11.2929 6.63604C11.6834 7.02656 12.3166 7.02656 12.7071 6.63604L13.1716 6.17157C14.7337 4.60948 17.2663 4.60948 18.8284 6.17157C20.3905 7.73367 20.3905 10.2663 18.8284 11.8284L12 18.6569L5.17157 11.8284C3.60948 10.2663 3.60948 7.73367 5.17157 6.17157C6.73367 4.60948 9.26633 4.60948 10.8284 6.17157Z" fill="currentcolor"></path>
            </svg>
        </div>
        <div class="w-full pt-9 pr-4">
            <h3 class="font-bold text-gray-700">{title}</h3>
            {/* <p class="py-4 text-sm text-gray-400">Are you sure you want to delete all feelings? If you delete your feelings, you will permantly loose everything.</p> */}
        </div>
        </div>
        

        <div class="p-4 flex ml-8 space-x-4">
            <input type="text" className="rounded-lg " onChange={(val) => setInputValue("measurement", val)}></input>
        {/* <a href="#" class="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</a> */}
        <button type="submit" class="w-1/2 px-4 py-3 text-center text-pink-100 bg-myblue-500 rounded-lg hover:bg-myblue-700 hover:text-white font-bold text-sm">Track</button>
        </div>
        {error.measurement.length > 0 ? <p class="font-bold text-gray-700">{error.measurement}</p>: null}
    </div>
    </div>
    </form>);
}

export default BodypartCard;