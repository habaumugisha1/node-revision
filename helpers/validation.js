import joi from 'joi';

export const userSchema = joi.object().keys({
    firstName :joi.string().min(4).max(50).required(),
    lastName : joi.string().min(4).max(50).required(),
    email : joi.string().email().min(5).max(30).required(),
    password :joi.string().min(5).max(1024).required(),
    isAdmin : joi.boolean().required(),
    userRole :joi.string().required(),
})

export const signInSchema = joi.object().keys({
    email:joi.string().email().min(5).max(30).required(),
    password:joi.string().min(5).max(1024)
})
