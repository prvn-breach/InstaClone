class JsonApiResponse {
    static create(res, error, code, message, error_details = [], data = []) {
        return res.status(code).json({ error, code, message, error_details, data });
    }

    static error(res, message, code, error_details = []) {
        let response = JsonApiResponse.create(res, true, code, message, error_details, []);
        return response;
    }

    static success(res, message, data = []) {
        let response = JsonApiResponse.create(res, false, 200, message, [], data);
        return response;
    }
}

module.exports = JsonApiResponse;