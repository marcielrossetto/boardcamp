import joi from  'joi';

export const customerSchema = joi.object({
    name: joi.string().trim().min(1).required,
    phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
});