import Joi from 'joi';

const wifisSchema = Joi.object({
    title: Joi.string().trim().required(),
    network: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

export default wifisSchema;
