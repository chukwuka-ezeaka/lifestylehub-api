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
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

 
  app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
  app.post('/signin', (req, res) => {register.handleSignin(req, res, db, bcrypt)})

  app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is listening ${process.env.PORT}`)
})
