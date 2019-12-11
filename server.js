const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const users = require('./controllers/users');
const userProfile = require('./controllers/userProfile');

//heroku configuration 
 /* const db = knex({
      client: 'pg',
      connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true
      }
    });*/
//end heroku config

//localhost configuration
  const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'lifestylehub'
    }
  });
//end localhost config

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send("Online")
})

  app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
  app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
  app.get('/users',  (req, res) => {users.handleUsers(req, res, db)});
  app.put('/updateProfile', (req, res) => {userProfile.updateProfile(req, res, db)});

  app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is listening ${process.env.PORT}`)
})
