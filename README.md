# Book App

**Author**: Michael Greene
**Version**: 1.0.0 

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

Finish time: _____

Actual time needed to complete: _____

Collaborators
-->Matthew Holder
