'use strict'

//bring in dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

//cors
app.use(cors());

//Where my server will look for pages to serve to the browser
app.use(express.static('./public'));

//Decode POST data
app.use(express.urlencoded({extended: true}));

//set default view engine
app.set('view engine', 'ejs');


//create routes
app.get('/', (request, response) => {
  const name = 'Bob';
  let petArray =['pet1', 'pet2', 'pet3'];

  response.status(200).render('index', {name: first, pets: petArray});
});


app.post('/contact', (request, response) => {
  const firstName = request.body.firstname;

  const lastName = request.body.lastname;

  response.status(200).send(firstName + ' ' + lastName);
});

//start server
app.listen(PORT, () => console.log(`Now listening on Port: ${PORT}.`);
);