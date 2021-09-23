import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

// headers: authHeader is how you pass the token for
// accessing protected data
class ExerciseService {

    create(workoutId, exerciseName, description, reps, weight, units) {
        return axios.post(
            API_URL+ "exercise/create/",
            {
                workoutId: workoutId,
                exerciseName: exerciseName,
                description: description,
                reps: reps,
                weight: weight,
                units: units
            },
            { headers: authHeader() }
        );
    }

}

export default new ExerciseService();