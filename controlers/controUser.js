import joi from 'joi';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../model/mDb'
// import isExist from '../model/'
import { userSchema, signInSchema } from '../helpers/validation'

class Users{
    static createUser(req, res){
        const isExist = 'SELECT * FROM users WHERE email=$1'
joi.validate(req.body, userSchema).then((result) => {
    
const sql = `INSERT INTO users (firstName, lastName, email, password, isAdmin, userRole, createdOn) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
pool.connect((error, client) => {
    if(error){ return res.status(403).json({status:403, message: error})};
    const isEmail = client.query(isExist, [result.email]);
    isEmail.then((user) => {
        if(user.rows.length > 0) return res.status(409).json({status:409, message:'This Email is already registered!'})
    }).catch((err)=> res.json(err));
    bcrypt.hash(result.password, 10, (error, hashedPassword) =>{
        if(error) return res.status(400).json({status:400,errors:error});
        const value = [result.firstName, result.lastName, result.email, hashedPassword, result.isAdmin, result.userRole, new Date()]; 
         return client.query(sql, value).then(() => {
         jwt.sign({
            email: result.email,
            isAdmin: result.isAdmin,
            firstName: result.firstName,
            lastName: result.lastName,
          },'SECRETEKEY',(errors,token) =>{
              if(errors) return res.status(403).json({status:403, error:errors})
              return res.status(201).json({status:201, message:'new User created successful!', data:token})
          })
         }).catch((er) => res.status(400).json({status:400,error:er}))
         
        //  .catch((err) => res.status(400).json({status:400, errors:err}))  
       });
   })
  }).catch((errors) => res.status(400).json({status:400, error: errors.details[0].message}))
};

static login(req, res){
const isExist = 'SELECT * FROM users WHERE email=$1'
joi.validate(req.body, signInSchema).then((result) => 
pool.connect((error, client) => {
    if(error) return res.status(403).json({status:403, message:error})
   return client.query(isExist,[result.email])
   .then((user)=> {
     if(user.rows.length === 0) return res.status(404).json({status:404, message:'You do not have Account please sign up first'});
     bcrypt.compare(result.password, user.rows[0].password, (err,data) =>{
        //  if(err) return res.status(403).json({status:403, message:'password not march!, try again'});
         if (!data) return res.status(403).json({status:403, err:'password not march!, Try again'})
         jwt.sign({
            email: user.rows[0].email,
            firstName: user.rows[0].firstname,
            lastName: user.rows[0].lastname,
            isAdmin: user.rows[0].isAdmin

         }, 'SECRETEKEY', (error,token) =>{
             if(error) return res.status(400).json({status:400, error:error});
             return res.status(200).json({ status:200, message:'You have susseccful logged In!', data:token})
         })
     })
         
     
   }).catch((err) => res.status(400).json({status:400, error:err}))


})
).catch((err) => res.status(400).json({status:400, errors:err.details[0].message}))
}

static getUsers(req, res){
const listQuery = 'select * from users';
pool.connect((err, client) => {
    if(err){
        return res.status(404).json({status:404, message:'not users found in database!'})
    }
    client.query(listQuery, (error, results) => {
        if(error){
            res.status(400).json({status:400, errors:error})
        }else{
            res.status(200).json({status:200, data:results.rows})
        }
    });
});
};

static specificUser(req, res){
const singleUser = 'SELECT * FROM users WHERE id=$1';
pool.connect((err, client) => {
    const userId = parseInt(req.params.id, 10);
    if(err) return res.status(400).json({status:400, error:err})
    return client.query(singleUser, [userId], (error,user)=>{
        if(!user.rows[0]) return res.status(404).json({ status:404, message:`This user with ID ${userId} is not found in database`});
        
        if(user) return res.status(200).json({status:200, data: user.rows[0]})
        
    })
})
}
}
export default Users;





// , (err, db) => {
//     if(err){
//         console.log(err)
//         return res.status(400).json({status:400, message:'what went wrong', error:err})
//     } else {
//         return res.status(201).json({status:201, message:'New User created successful', data:value})
//     }
// })