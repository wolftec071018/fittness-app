import React from 'react';
import useWindowDimensions from '../components/resize';
import viz from '../components/progression';
import axios from 'axios';
import authHeader from '../../services/auth-header'; 
import MeasurementService from '../../services/measurements.service';
import measurementsService from '../../services/measurements.service';
import AthleteSidebar from "./athleteSidebar";

const API_URL = 'http://localhost:5000/';

function BodyProgression(){
    const { height, width } = useWindowDimensions();
    React.useEffect(() => {
        MeasurementService.getBodyParts().then(
            res => {
                console.log(res.data);
                // res.data.forEach(( body ) => {
                //     measurementsService.getBodyPartName(body.bodyPartName).then(
                //         res => {
                //             console.log(res)
                //         }
                //     )
                // })
            },
            err => {
                console.log(err.message)
            })
        viz(width, height);
    }, [height, width]);
    return (
        // <div id="chart"></div>
        <div class="welcomebg">
            <AthleteSidebar />
<div class="min-h-screen flex items-center justify-center">
    <div class="bg-mywhite-500 p-4 rounded w-3/4 ml-40">
        <h2 class="text-xl">
        Progression
        </h2>
        <div class="space-y-4 md:space-y-0 mt-4" style = {{width:width / 2 + 50}}>
            <div class="shadow border rounded-lg">
                <div class="flex items-center space-x-4 p-4">
                    <div class="flex-1">
                        <div id="chart"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{/*             
<div class="min-h-screen flex items-center justify-center px-4">
    
    <div class="max-w-4xl  bg-white rounded-lg shadow-xl" style= {{width: width / 2 + 50}}>
    <div id="chart"></div>
        </div>
</div> */}
</div>
    );
 }

export default BodyProgression;