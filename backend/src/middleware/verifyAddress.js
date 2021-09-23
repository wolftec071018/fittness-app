const { max_char, checkLength } = require('./validators');

// US states
const STATES = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

// check for valid street length
validStreet = (req, res, next) => {
    max_char(req.body.street, 120, res, next);
}

// check for valid city length
validCity = (req, res, next) => {
    max_char(req.body.city, 120, res, next);
}

// check for valid state
validState = (req, res, next) => {
    if (req.body.state) {
        const state = req.body.state;
        if (checkLength(state, 2)) {
            if (!(state.toUpperCase() in STATES)) {
                res.status(400).json({
                    message: "Invalid State"
                });
                return;
            }
        }
        else {
            res.status(400).json({
                message: "Invalid State length"
            });
            return;
        }
    }
    next();
}

// check for valid zipcode length and type
validZipCode = (req, res, next) => {

    if (req.body.zipcode) {
        let zipCode = req.body.zipcode;

        if(!checkLength(zipCode, 5)) {
            res.status(400).json({
                message: "Invalid zipcode length"
            })
            return;
        }

        zipCode = parseInt(zipCode);

        if(isNaN(zipCode) || zipCode < 1001) {
            res.status(400).json({
                message: "Invalid zipcode format"
            })
            return;
        }
    }
    next();
}

const verifyAddress = {
    validStreet: validStreet,
    validCity: validCity,
    validState: validState,
    validZipCode: validZipCode
}

module.exports = verifyAddress;