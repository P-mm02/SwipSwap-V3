const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const fs = require('fs');
const path = require('path');
const itemsData = require('./itemsData.json');
const { constants } = require('buffer');
const { name } = require('ejs');
const methodOverride = require('method-override')
const mongoose =require('mongoose')
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
var https = require('https');

let userLogin = '6109610151';
let today = new Date()
let studentInfo = ''

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
  type: String,
  nameItem: String,
  ratingOwner: Number,
  condition: Number,
  shipment: String,
  interesting: String,
  category: String,
  description: String,
  date: {
    type: String,
    default: () => today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  },
  img2: String,
  img5: String,
  img6: String,
  available: {
    type: Boolean,
    default: true
  }
})

const items = mongoose.model('items', itemsDB);
const newItem = new items({
  nameOwner: 'String',
  type: 'String',
  nameItem: 'String',
  ratingOwner: 4.5,
  condition: 80 ,
  shipment: 'String',
  interesting: 'String',
  category: 'String',
  description: 'String',  
  img2: 'String',
  img5: 'String',
  img6: 'String',

  available: true
})

// newItem.save()
// .then(savedItem => {
//   console.log('Item saved');
// })
// .catch(error => {
//   console.error('Error saving item:', error);
// });


const userDB = new mongoose.Schema({
  username: String,
  type: String,
  name: String,
  rating: Number,
  faculty: String,
  phoneNumber: String,
  email: String,
  address: String,
  date: {
    type: Date,
    default: () => moment().tz('Asia/Bangkok').toDate() // Set default date to Thailand time
  },
  img1: String,  
})

const user = mongoose.model('user', itemsDB);


// newUser.save()
// .then(savedItem => {
//   console.log('User saved');
// })
// .catch(error => {
//   console.error('Error saving User:', error);
// });



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







// const req = https.request(options, function (res) {
//   const chunks = [];
  
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//     studentInfo += chunk;
//     console.log('data');

//   });

//   res.on("end", function (chunk) {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     const data = body.toString(); // Convert the buffer to a string
//     console.log(data); // Log the data
//     // You can perform further operations with the 'data' variable here
//   });

//   res.on("error", function (error) {
//     console.error(error);
//   });  
// });




app.post('/login/send', (req, res) => {
  const {username} = req.body;
  userLogin = username;
  var options = {
    'method': 'GET',
     'hostname': 'restapi.tu.ac.th',
    'path': '/api/v2/profile/std/info/?id='+userLogin,
    'headers': {
      'Content-Type': 'application/json',
      'Application-Key': 'TU8c99286ccddd6571357ee5fb3d4ee059d86bb37dbb3f3c6d4c20e1a440a8733cf6b9091cf6bb6918aee800a2ed5a0ca0'
    }
  };
  
  var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      // studentInfo = body;
      // console.log(studentInfo.toString());
      studentInfo = JSON.parse(body); // Assuming studentInfo is JSON data
      // console.log(studentInfo.data.type);
  
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  req.end();
});

app.get('/home', (req, res) => {  
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
  const newUser = new user({
    username: 'String',
    type: 'String',
    name: 'String',
    rating: 4.2,
    faculty: 'String',
    phoneNumber: 'String',
    email: 'String',
    address: 'String',  
    img1: 'String',
  })
  studentNameTH = studentInfo.data.displayname_th;
  studentName = studentInfo.data.displayname_en;
  studentEmail = studentInfo.data.email;
  studentFaculty = studentInfo.data.faculty;
  studentDepartment = studentInfo.data.department;  

  res.render('profile',{studentNameTH,studentName,studentEmail,studentFaculty,studentDepartment});
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
app.post('/addSwap/makelist', (req, res) => {
  const inputItemName = req.body.inputItemName;
  const inputCategory = req.body.inputCategory;
  const inputCondition = req.body.inputCondition;
  const interest = req.body.interest;
  const inputShipment = req.body.inputShipment;
  const inputDescription = req.body.inputDescription;
  // const inputImg1 = req.body.inputImg1;
  const inputImg2 = req.body.inputImg2;
  // const inputImg3 = req.body.inputImg3;
  // const inputImg4 = req.body.inputImg4;
  const inputImg5 = req.body.inputImg5;
  const inputImg6 = req.body.inputImg6;

  const newItem = new items({
    nameOwner: userLogin,
    type: 'swap',
    nameItem: inputItemName,
    ratingOwner: 4.5,
    condition: inputCondition ,
    shipment: inputShipment,
    interesting: interest,
    category: inputCategory,
    description: 'inputCategory',  
    img2: inputImg2,
    img5: inputImg5,
    img6: inputImg6,
    available: true
  })

  newItem.save()
.then(savedItem => {
  console.log('Item saved');
})
.catch(error => {
  console.error('Error saving User:', error);
});

  // console.log(inputItemName,inputCategory,inputCondition,interest,inputShipment,inputDescription,inputImg2,inputImg5,inputImg6)
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
  // const xxx = studentInfo.data
  // let jsonfile = { key: 'value' };
});