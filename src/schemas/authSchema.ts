import joi from 'joi';

const signUpSchema = joi.object({
    email: joi.string().max(100).email().required(),
    password: joi.string().min(10).max(50).required(),
    confirmPassword: joi.string().max(50).required().valid(joi.ref('password'))
});

const loginSchema = joi.object({
    email: joi.string().max(100).email().required(),
    password: joi.string().max(50).required()
});


export {signUpSchema, loginSchema};