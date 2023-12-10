const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});