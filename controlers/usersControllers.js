import joi from 'joi';
import Database from '../model/myDb'
// import db from '../model/db.js';
import userSchema from '../helpers/validation'


class Users {
    static signUp(req, res) {
 joi.validate(req.body, userSchema).then(async (result) => {
    const newUser = [
       result.id ,
       result.firstName ,
       result.lastName ,
       result.email ,
       result.password ,
       result.isAdmin ,
       result.userRole ,
        new Date()
    ];

    const sql = `INSERT INTO users VALUES ($1,$2,$3,$4,$5,$6,$7), [result.firstName,result.lastName,result.email,result.password,result.isAdmin,result.userRole,new Date()] RETURNING * `; 
    const user = Database.executeQuery(sql, newUser);
        user.then((userResult) => {
          if (userResult.rows) {
            return res.status(201).json({
              status: 201,
              data: userResult.rows,
            });
          }
          
        }).catch(error => res.status(400).json({
                  status: 400,
                  error: `bad request ${error}`
                }));
    //     const {firstName,lastName,email,password,isAdmin,userRole} = req.body;
    //     db.then((newDb) => newDb.query('INSERT INTO users VALUES ($1,$2,$3,$4,$5,$6)', [firstName,lastName,email,password,isAdmin,userRole,new Date()], (error, data) =>{
    //         if (error){
    //             throw error;
    //         }
    //         res.status(201).json({
    //             status:201,
    //             message: 'user created successful',
    //             results: data.rows
    //         })
    //     } )
    //     ).catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request ami', data: dberr }));
    }).catch(error => res.status(400).json({ status: 400, error: error.details[0].message }))
 };

 static getUsers (req, res){
   const sql = `SELECT * FROM users RETURNING *`;
   const users = Database.executeQuery(sql);
   console.log(users)
   users.then((value) => {
     if(value.rows) {
       return res.status(200).json({
     status:200,
     data: value.rows
   })
  }
 }).catch(err => res.status(404).json({status:404, message :`No users found in database, ${err}` }));
 }

}

export default Users;