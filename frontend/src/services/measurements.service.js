import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

class MeasurementsService {

    getBodyParts() {
        return axios.get(
            API_URL + "progress/all/",
            {headers: authHeader() }
        );
    }

    getBodyPartName(name) {
        return axios.get(
            API_URL + `progress/${name}/`,
            {headers: authHeader() }
        );
    }

    getBodyPartNAmeAndSide(name, side) {
        return axios.get(
            API_URL + `progress/${name}/${side}/`,
            {headers: authHeader() }
        );
    }

    async create(bodyPart, side, measure) {
        const res = await axios.post(
            API_URL + 'progress/create/',
            {
                bodyPart: bodyPart,
                side: side
            },
            {
                headers: authHeader()
            });


        const bp = res.data;  // for sure something is returned

        return axios.post(
            API_URL + 'measurement/add/',
            {
                bodyPartId: bp.id,
                circumference: measure
            },
            {
                headers: authHeader()
            });
    }

    getLatest(bodyPart, side) {
        var url = API_URL + `progress/${bodyPart}/`;

        if (side) {
            const urlSide = `${side}/`;
            url += urlSide;
        }

        return axios.get(
            url,
            {
                headers: authHeader()
            });
    }
}

export default new MeasurementsService();