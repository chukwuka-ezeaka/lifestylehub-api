const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const register = require('./controllers/register');
const signin = require('./controllers/signin')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'lifestylehub'
    }
  });

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.listen(3000, () =>{
      console.log('app is listening on port 3000')
  })

  app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

  app.post('/signin', (req, res) => {register.handleSignin(req, res, db, bcrypt)})