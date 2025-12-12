import joi from 'joi';

const registerSchema = joi.object({
    name: joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    password: joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    })
})

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    password: joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
    })
});

export { registerSchema, loginSchema }