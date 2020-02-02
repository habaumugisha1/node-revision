import joi from 'joi';
// import Database from '../model/myDb'
import db from '../model/db.js';
import userSchema from '../helpers/validation'
import { json } from 'body-parser';

const getUsers = (req, res) => {
    const sql = `SELECT * FROM users RETURNING *`;

        () => db.query(sql)
        .then((users) => {
            res.status(200).json({ status: 200, data: users.rows })
        }).catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request Ami', data: dberr }))
        
    // try {
    //     await db.query(sql, (err, data) => {
    //         if(err) {
    //             throw err
    //         }

    //         return res.status(200).json({status:200, users:data.rows})
    //     })
    // } catch (error) {
    //     return res.status(400).json({status:400, errors:error})
    // }
}

export default getUsers;



// return dbClient.then(
//     (client) => client.query(getAllSessions)
//       .then((sessions) => {
//         res.status(200).json({ status: 200, data: sessions.rows });
//       }).catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request', data: dberr })),
//   );