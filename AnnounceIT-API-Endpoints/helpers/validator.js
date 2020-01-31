const Joi = require('joi');

const validateUser = user => {
    const schema = {
        id:Joi.number(),
        firstname:Joi.string(),
        lastname:Joi.string(),
        username:Joi.string().min(3).required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        phoneNumber:Joi.number(),
        isAdmin:Joi.boolean()
    };
    return schema.validate(user);
};
module.exports = validateUser;