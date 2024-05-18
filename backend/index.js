// Import the Express module
const express = require('express');
// Import the CORS middleware
const cors = require('cors');
// Create an Express app
const app = express();
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Define a simple route
app.get('/get-users', (req, res) => {
  res.send([
    {test: 1},
    {test: 2},
    {test: 3},
  ]);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});