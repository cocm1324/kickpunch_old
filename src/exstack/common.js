const errorCode = require('./enums/error-code.enum');
const fs = require('fs');
const sha256 = require('js-sha256');

module.exports = {
    errorMessage: (res, code, responseBody = null) => {
        if (code >= 400 && code < 500) {
            const response = {
                RESULT: 0
            }
            if (responseBody) {
                response['response'] = responseBody;
            }
            res.statusMessage = errorCode.code[code];
            res.status(code).send(response);
        } else if (code >= 500 && code < 600) {
            const response = {}
            if (responseBody) {
                response['error'] = responseBody;
            }
            res.statusMessage = errorCode.code[code];
            res.status(code).send(response)
        }
    },

    hash: (target) => {
        let sha256Credential;
        let targetString = target.trim();
    
        try {
            sha256Credential = JSON.parse(fs.readFileSync(".secret/.sha256.secret", "utf8"));
        }
        catch (error) {
            console.error(error);
        }
    
        return sha256.hmac(sha256Credential.key, targetString);
    }
}