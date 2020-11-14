'use strict'

//bring in dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
//const { response } = require('express');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

//create routes
app.get('/', homeRouteHandler);
app.get('/books/:id', collectionDetailsHandler);
app.post('/books', addBookToCollection);
app.get('/newSearch', startNewSearch);
app.post('/searches', searchHandler);
app.use('*', notFoundHandler);

// function handlers
function homeRouteHandler(request, response) {
  try {
    let SQL = 'SELECT * from books;';
    return client.query(SQL)
      .then(results => response.render('pages/index', { results: results.rows }));
  }
  catch (error) {
    errorHandler(error, response);
  }
}

function collectionDetailsHandler(request, response) {
  try {
    let SQL = `SELECT * from books WHERE id = ${request.params.id};`;
    client.query(SQL)
      .then(results => response.render('pages/books/details', { 'results': [results.rows[0]] }))
  }
  catch (error) {
    errorHandler(error, response);
  }
}

function addBookToCollection(request, response) {
  try {
    let SQL = 'INSERT INTO books (author, title, isbn, image_url, descr) VALUES ($1, $2, $3, $4, $5) returning *;';
    const sqlParams = [request.body.author, request.body.title, request.body.isbn, request.body.image, request.body.description];
    client.query(SQL, sqlParams).then(results => {
      response.status(200).redirect(`books/${results.rows[0].id}`);
    })
  }
  catch (error) {
    errorHandler(error, response);
  }
}

function startNewSearch(request, response) {
  try {
    response.render('pages/searches/new');
  }
  catch (error) {
    errorHandler(error, response);
  }
} 

function searchHandler(request, response){
  try {
    let URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    let searchParam = request.body.searchTag;
    let radioButton = `in${request.body.rbutton}:`;
    let apiKey = `&key=${process.env.GOOGLE_API_KEY}`;
    const paramURL = `${radioButton}${searchParam}${apiKey}`;
    URL = `${URL}${paramURL}`

    let bookArray = [];
    superagent.get(URL).then(data => {

      const parsedData = JSON.parse(data.text).items;
      bookArray = parsedData.map(element => {
        const imgURL = element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
        const title = element.volumeInfo.title;
        const authors = element.volumeInfo.authors;
        const descrp = element.volumeInfo.description;
        const isbn = element.volumeInfo.industryIdentifiers[0].identifier;
        let bookItem = new Book(imgURL, title, authors, descrp, isbn);

        return bookItem;
      });
      response.status(200).render('pages/searches/show.ejs', { searchResults: bookArray });
    });
  }
  catch (error) {
    errorHandler(error, response);
  }
}

function deleteHandler(request, response) {

}

function editHander() {

}

function notFoundHandler(request, response) {
  response.status(404).send('No such address found, my friend. Did you type in the correct route?');
}

function errorHandler(error, response) {
  console.log('ERROR', error);
  response.status(500).send('So sorry, something went wrong.');
}

//start server
client.connect().then(() => {
  app.listen(PORT, () => console.log(`App is Now listening on Port: ${PORT}.`));
}).catch(err => {
  console.log('ERROR', err);
});


//Constructors
function Book(image, title, author, description, isbn) {
  this.image = image || 'https://i.imgur.com/J5LVHEL.jpg';
  this.name = title || 'No Title Returned';
  this.author = author || 'No Author Returned';
  this.description = description || 'N/A';
  this.isbn = isbn || 'N/A';
}
