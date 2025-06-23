class InvalidRequestException extends Error {
    constructor(message = 'Something went wrong', statuscode = 400, data = {}) {
        super(message);
        this.statuscode = statuscode;
        this.data = data;
    }
}

class InvalidAuthentication extends Error {
    constructor(message = 'Authentication failed', statuscode = 401, data = {}) {
        super(message);
        this.statuscode = statuscode;
        this.data = data;
    }
}
module.exports={InvalidRequestException,InvalidAuthentication};