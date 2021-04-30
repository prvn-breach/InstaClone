let Validator = require('validatorjs');

const validator = (body, rules, customMessages) => {
    let validation = new Validator(body, rules, customMessages);
    if (validation.fails()) {
        let errors = {};
        for (const [key, value] of Object.entries(validation.errors.errors)) {
            errors[key] = value[0];
        }
        return errors;
    }
    return {};
};

module.exports = validator;