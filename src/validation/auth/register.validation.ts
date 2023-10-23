const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address format',
      'any.required': 'Email is required',
    }), 
    password: Joi.string().required().messages({'any.required': 'password is required'}), 
    fname: Joi.string().required().messages({'any.required': 'fname is required'}),  
    lname: Joi.string().required().messages({'any.required': 'lname is required'}), 
})

export const registerValidation = async(data:any) => {
    return await schema.validate(data);
}
