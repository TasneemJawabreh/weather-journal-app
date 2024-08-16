// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// GET route to return project data
app.get('/data', (req, res) => {
  res.send(projectData);
});

// POST route to add incoming data to projectData
app.post('/addData', (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  res.send(projectData);
});

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

