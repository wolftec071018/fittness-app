import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

// headers: authHeader is how you pass the token for
// accessing protected data
class WorkoutService {

    getAll() {
        return axios.get(API_URL + 'workouts/all/', { headers: authHeader() });
    }

    create(athleteId, workoutName, sets, startDate, endDate, restPeriod) {
        return axios.post(
            API_URL + 'workouts/create/',
            {
                athleteId,
                workoutName,
                sets,
                startDate,
                endDate,
                restPeriod
            },
            {
                headers: authHeader()
            }
        )
    }

    getById(workoutId) {
        return axios.get(API_URL + `workouts/${workoutId}/`, { headers: authHeader() });
    }
}

export default new WorkoutService();