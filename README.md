# Book App

**Author**: Michael Greene
**Version**: 1.1.0 

## Overview
This app is meant for users to be able to search for books based only on their memory of part of the title or author's name.

## Getting Started
1) A server must first be created. 
  a) Create a package.json file with npm init -y
  b) Install the necessary dependencies with npm install    
  c) Create server.js file 
    - create references to dependencies
    - set up routes using express().post(), ensure to include app.use(express.urlencoded) to decode data.
    - create a listener for the correct port with express().listen()
2) Run nodemon to start server.

## Architecture
App is coded with Javascript as backend language. Page is deployed using HTML. Environment varibles are stored with a .env file. Necessary dependencies are stored via a package.json file
Dependencies:
    - express
    - cors
    - ejs
    - superagent
    - dotenv
    - heroku

## Change Log
Number and name of feature: 1. As a user, I want my application to load quickly so that I have an enjoyable experience.

Given that a user opens the application in the browser
When the user navigates to the home page
Then the index should load without a flash of unstyled content (FOUC)

Estimate of time needed to complete: 30 min

Start time: 1:54 pm

Finish time: 1:55pm

Actual time needed to complete: 1 hr 1min

10-31-2001 2:56pm - Application now able to render content via index.ejs

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Number and name of feature: 2. As a user, I want to search the Google Books API so that I can view the results of my search.

Given that the user enters a seach query
When the user submits the search form
Then the search query should be included in a request to the Google Books API

Estimate of time needed to complete: 1 hr 

Start time: 2:00 pm

Finish time: 3:45pm

Actual time needed to complete: 1 hr 45min

10-31-2001 3:47pm - Application now able to send information from front end server to back end server via thr POST method from new.ejs
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Number and name of feature: 3. As a user, I want to be able to browse the search results.

Given that the user enters a seach query
When the user submits the search form
Then the first ten books should be displayed to the user

Estimate of time needed to complete: 2 hr 

Start time: 4:55 pm

Finish time: :pm

Actual time needed to complete: 1 hr 45min

10-31-2001 3:47pm - Application now able to send information from front end server to back end server via thr POST method from new.ejs

Collaborators
-->Matthew Holder
