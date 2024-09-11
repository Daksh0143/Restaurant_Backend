const Joi = require("joi")
const { hashPassword } = require('../services/bcrypt.service')
const { successResponse, failureResponse } = require("../helper/api.helper.response")




const registerValidation = async (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and be at least 8 characters long.',
                'string.min': 'Password should have a minimum length of 8 characters.',
                'any.required': 'Password is required.',
            }),
        restaurantName: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        contactNumber:Joi.string().min(10).max(10).required()
    });
    const value = schema.validate(req.body);
    if (value.error) {
        console.log("Value Error", value.error)
        return failureResponse({
            res,
            message: "Something Wrong",
            statusCode: 501,
        });
    }
    req.body.password = await hashPassword(req.body.password)
    next();
}

const loginValidation=async(req,res,next)=>{
        
}


module.exports = { registerValidation }