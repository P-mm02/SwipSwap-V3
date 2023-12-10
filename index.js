const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
// const fs = require('fs');
const path = require('path');

// Setting the view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/img')));


// Define a route
app.get('/', (req, res) => {
  console.log('req SwipSwap')
  res.render('login')
});
app.get('/home', (req, res) => {
  // Process form data here
  // For example: Retrieve form data from req.body

  // Render the home.ejs file as a response
  res.render('home');
});

// app.use((req, res) => {
//   console.log("Got New Req")
//   // res.send("weeeeee")
//   res.send('<h1>xxxxxxxxxxweeeeee<h1>')
// })

app.get('*', (req, res) => {
  res.send('<h1>This Page Do Not Exit!!!</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});