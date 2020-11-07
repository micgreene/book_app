'use strict'

//bring in dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

//create client
const client = new pg.Client(process.env.DATABASE_URL);

//cors
app.use(cors());

//Where my server will look for pages to serve to the browser
app.use(express.static('./public'));

//Decode POST data
app.use(express.urlencoded({ extended: true }));

//set default view engine
app.set('view engine', 'ejs');


//create routes

app.get('/', (request, response) => {
  response.status(200).render('pages/searches/new.ejs');
});

app.post('/searches', (request, response) => {
  try {
    let URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    let searchParam = request.body.searchTag;
    let radioButton = `in${request.body.rbutton}:`;
    let apiKey = `&key=${process.env.GOOGLE_API_KEY}`;
    const paramURL = `${radioButton}${searchParam}${apiKey}`;
    URL = `${URL}${paramURL}`

    let bookArray = [];
    superagent.get(URL).then(data => {
      console.log('working');
      const parsedData = JSON.parse(data.text).items;
      bookArray = parsedData.map(element => {
        const imgURL = element.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
        const title = element.volumeInfo.title;
        const authors = element.volumeInfo.authors;
        const descrp = element.volumeInfo.description;
        let bookItem = new Book(imgURL, title, authors, descrp);

        return bookItem;
      });
      console.log(bookArray);
      response.status(200).render('pages/searches/show.ejs', { searchResults: bookArray });
    });
  }
  catch (error) {
    console.log('ERROR', error);
    response.status(500).send('So sorry, something went wrong.');
  }

});
app.use('*', notFoundHandler);
function notFoundHandler(request, response) {
  response.status(404).send('No such address found, my friend. Did you type in the correct route?');
}

//start server
client.connect().then( () => {
  app.listen(PORT, () => console.log(`App is Now listening on Port: ${PORT}.`));
}).catch(err => {
  console.log('ERROR', err);
});


//Constructors
function Book(image, title, author, description) {
  this.image = image || 'https://i.imgur.com/J5LVHEL.jpg';
  this.name = title || 'No Title Returned';
  this.author = author || 'No Author Returned';
  this.description = description || 'N/A';
}
