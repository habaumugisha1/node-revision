import express from 'express';
import {json} from 'body-parser';
import cros from 'cors';
// import Users from './controlers/usersControllers'
// import createUser from './controlers/controUser'
import Users from './controlers/controUser'

const PORT = process.env.PORT || 3000;
const app = express()
app.use(cros());
// app.use(logger('dev'));
app.use(json());
// app.post('/signUp', Users.signUp)
app.post('/signUp',Users.createUser)
app.post('/login', Users.login)
app.get('/usersList', Users.getUsers)
app.get('/usersList/:id', Users.specificUser)

app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost: ${PORT}`);
  });
  
  export default app;