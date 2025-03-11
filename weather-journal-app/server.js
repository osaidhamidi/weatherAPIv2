// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express and CORS
const express = require('express');
const cors = require('cors');

// Bbody parser
const bodyParser = require('body-parser');

// Start an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Serve static files from the 'website' directory
app.use(express.static('website'));

// Server's port
const port = 8000;

// Start the server
const server = app.listen(port, function () {  
  console.log(`Server is running on port: ${port}`);
});

// GET 
app.get('/all', function (request, response) {
  response.send(projectData);
});

// POST 
app.post('/add', function (request, response) {
  projectData = request.body;
  console.log(projectData);
  response.send(projectData);
});