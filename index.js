const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
// const fs = require('fs');
const path = require('path');
const itemsData = require('./itemsData.json');
const { constants } = require('buffer');
const { name } = require('ejs');
const methodOverride = require('method-override')
const mongoose =require('mongoose')

// Setting the view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/img')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


// mongoose.connect('mongodb://127.0.0.1:27017/test');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to the SwipSwap database!!!');// });

const uri = 'mongodb+srv://sirwst:swipswap@cluster0.2ma9qhw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to the SwipSwap database!!!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


const itemsDB = new mongoose.Schema({
  nameOwner: String,
  nameItem: String,
  ratingOwner: Number,
  condition: Number,
  shipment: String,
  interesting: [String],
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now // Setting the default value to the current date and time when a document is created
  },
  img: String
})


const items = mongoose.model('items', itemsDB);
const newItem = new items({
  nameOwner: 'String',
  nameItem: 'String',
  ratingOwner: 'Number',
  condition: 'Number',
  shipment: 'String',
  interesting: ['String','String','String'],
  category: 'String',
  description: 'String',
  date: {
    type: Date,
    default: Date.now // Setting the default value to the current date and time when a document is created
  },
  img: 'String'
})

// items.createCollection()
  // .then(savedItem => {
  //   console.log('Item saved:', savedItem);
  // })
  // .catch(err => {
  //   console.error('Error saving item:', err);
  // });

// Define a route
app.get('/', (req, res) => {
  console.log('req SwipSwap')
  res.render('login')
});
app.get('/login', (req, res) => {
  res.render('login')
});
app.post('/login/send', (req, res) => {
  const {username} = req.body;
  console.log(username)
});

app.get('/home', (req, res) => {
  // Process form data here
  // For example: Retrieve form data from req.body
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
  res.render('profile')
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