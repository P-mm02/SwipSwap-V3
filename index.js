const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
// const fs = require('fs');
const path = require('path');
const itemsData = require('./itemsData.json');
const { constants } = require('buffer');
const { name } = require('ejs');

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
app.get('/login', (req, res) => {
  res.render('login')
});
app.get('/home', (req, res) => {
  // Process form data here
  // For example: Retrieve form data from req.body

  // Render the home.ejs file as a response
  res.render('home');
});
app.get('/SwapList', (req, res) => {
  res.render('SwapList')
});
app.get('/swapGive', (req, res) => {
  res.render('swapGive')
});
app.get('/userInfo', (req, res) => {
  res.render('userInfo')
});
app.get('/register', (req, res) => {
  res.render('register')
});
app.get('/profileWindow', (req, res) => {
  res.render('profileWindow')
});
app.get('/profile', (req, res) => {
  const fileName = req.path.split('/').pop();
  res.render('profile', { url: req.originalUrl })
});
app.get('/profile-swap', (req, res) => {
  res.render('profile-swap')
});
app.get('/profile-history', (req, res) => {
  res.render('profile-history')
});
app.get('/profile-giveaway', (req, res) => {
  res.render('profile-giveaway')
});
app.get('/message', (req, res) => {
  res.render('message')
});
app.get('/GiveList', (req, res) => {
  res.render('GiveList')
});
app.get('/addSwap', (req, res) => {
  res.render('addSwap')
});
app.get('/addGive', (req, res) => {
  res.render('addGive')
});
app.get('/navigation', (req, res) => {
  res.render('nav2'); // Renders the nav2.ejs template and sends HTML as a response
});
app.get('/profileWindow', (req, res) => {
  res.render('profileWindow', { url: req.originalUrl }); // Renders the profileWindow.ejs template and sends HTML as a response
});


app.get('/s/:items', (req, res) => {
  const username = 'XXX'; // Example username
  const {items} = req.params;
  const data = itemsData[items];

  if(data){
    res.render('tutorial', { username, ...data });
  }else{
    res.send('<h1>This Page Do Not Exit!!!</h1>');
  }


});

// app.use((req, res) => {
//   console.log("Got New Req")
//   // res.send("eeeeee")
//   res.send('<h1>xxxxxxxxxxeeeeee<h1>')
// })

app.get('*', (req, res) => {
  res.send('<h1>This Page Do Not Exit!!!</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});