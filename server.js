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
  const first = 'Bob';
  let petArray =['pet1', 'pet2', 'pet3'];

  response.status(200).render('pages/searches/new.ejs', {name: first, pets: petArray});
});


app.post('/searches', (request, response) => {
  let  URL = 'https://www.googleapis.com/books/v1/volumes?q=';
  
  let searchParam = request.body.searchTag;
  let radioButton = `in${request.body.rbutton}:`;
  let apiKey = `&key=${process.env.GOOGLE_API_KEY}`;  
  const paramURL = `${radioButton}${searchParam}${apiKey}`;
  URL = `${URL}${paramURL}`

  response.status(200).send();
});

//start server
app.listen(PORT, () => console.log(`Now listening on Port: ${PORT}.`)
);


//Constructors
function Book(image, title, author, description){
  this.image = image || 'https://i.imgur.com/J5LVHEL.jpg';
  this.name = name || 'No Title Returned';
  this.author = author || 'No Author Returned';
  this.description = description || 'N/A';
}
