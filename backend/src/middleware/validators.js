/*
    Checks Email param to make sure it is a valid
*/
validEmail = (req, res, next) => {
   if(!validateEmail(req.body.email)){
        res.status(400).json({
            message: "Please enter a valid email address"
        })
        return;
   }
   next();
}

/*
    Checks Password param to make sure it is a valid
*/
validPassword = (req, res, next) => {
    if(!validatePassword(req.body.password)){
         res.status(400).json({
             message: "Please Enter a valid password"
         })
         return;
    }
    next();
}

/*
    Checks description for 120 max
 */
maxChar_desc = (req, res, next) => {
    max_char(req.body.description, 120, res, next);
}

// Function that helps validate email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function that helps validate password with at least: One uppercase, one lowercase, one number, and one symbol
function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return re.test(String(password));
}

/**
 * Global function to check for specific length in a string and return a response
 * @param str {any} variable to be checked
 * @param len {number} max length
 * @param res {any} response
 * @param next
 * @return {void}
 */
max_char = (str, len, res, next) => {
    if (str) {
        if (!checkLength(str, len)) {
            res.status(400).json({
                message: `Invalid length for ${str}, max char can only be ` + len.toString()
            })
            return;
        }
    }
    next()
}
/**
 * Checks for the length of a specific string
 * @param str
 * @param len
 * @return {boolean}
 */
checkLength = (str, len) => {
    let s = str.toString();
    return s.length <= len;
}

// global validators
const validators = {
    validEmail : validEmail,
    validPassword : validPassword,
    max_char: max_char,
    checkLength: checkLength
}

module.exports = validators;