const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const path = require('path');
const itemsData = require('./itemsData.json');
const methodOverride = require('method-override')
const mongoose =require('mongoose')
var https = require('https');

// Require the item and user schemas
const items = require('./public/models/item');
const users = require('./public/models/user');
const { Script } = require('vm');
const { render } = require('ejs');
// Now you can use Item and User models in your application


//สร้างตัวแปรไว้ก่อนเพื่อให้สะดวกกับการใช้งาน เพราะต้องดึงไปใช้หลายรอบ (ส่งข้อมูลข้ามฟังก์ชัน)
userLogin = '6109610151';
today = new Date()
let studentInfo = ''
let myProductOffer

// Setting the view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/img')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//connect to mongodb
const uri = 'mongodb+srv://sirwst:swipswap@cluster0.2ma9qhw.mongodb.net/SwipSwap?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to the SwipSwap database!!!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

/*Login and Pull data from TUAPI*/
app.get('/', (req, res) => {
  res.render('login')
});
app.get('/login', (req, res) => {
  res.render('login')
});
app.post('/login/send', (req, res) => {
  userLogin = req.body.username;
  var options = {
    'method': 'GET',
     'hostname': 'restapi.tu.ac.th',
    'path': '/api/v2/profile/std/info/?id='+userLogin,
    'headers': {
      'Content-Type': 'application/json',
      'Application-Key': 'TU8c99286ccddd6571357ee5fb3d4ee059d86bb37dbb3f3c6d4c20e1a440a8733cf6b9091cf6bb6918aee800a2ed5a0ca0'
    }
  };
  
  //ดึงข้อมูลนักศึกษาใส่ file JSON
  //function (res) ใช้เพื่อจัดการ response โดยรวม ที่ได้รับจาก sever
  //function (chunk) ใช้เพื่อจัดการ ข้อมูลภายในของ response
  var req = https.request(options, function (res) { 
    var chunks = [];
    res.on("data", function (chunk) {//เก็บข้อมูล chunk จาก res มาใส่ในตัวแปร chunks
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks); //แปลง Chunks จาก array เป็น ฺBinary data      
      studentInfo = JSON.parse(body); // แปลง body จาก Binary data เป็น JSON data      
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  req.end();
});

//function on home page.
app.get('/home', async (req, res) => {

  myProductOffer = await items.find({ idOwner: userLogin, type: 'swap', available: true }).sort({ _id: -1 }).exec()

  const swapList = await items.find({type: 'swap', Dealing_User: 'none', available: true}).sort({ _id: -1 }).limit(6).exec()
  const giveList = await items.find({type: 'giveaway', Dealing_User: 'none', available: true}).sort({ _id: -1 }).limit(6).exec()
  res.render('home',{swapList,giveList,myProductOffer,userLogin});

  /*
  items.find({type: 'swap', Dealing_User: 'none'}).sort({ _id: -1 }).limit(6).exec()
  .then(allSwapItems => {allSwapItems;
    swapList = allSwapItems    
    items.find({type: 'giveaway', Dealing_User: 'none'}).sort({ _id: -1 }).limit(6).exec()
    .then (allGiveItems => {allGiveItems;
      giveList = allGiveItems 
      res.render('home',{swapList,giveList,myProductOffer,userLogin});      
    })
    .catch(err => {
      console.error(err);
    });
  })
  .catch(err => {
    console.error(err);
  });
  */
});

//function on Swap page.
app.get('/SwapList', async (req, res) => {
  myProductOffer = await items.find({ idOwner: userLogin, type: 'swap', available: true }).sort({ _id: -1 }).exec()
  
  const swapList = await items.find({type: 'swap', Dealing_User: 'none'}).sort({ _id: -1 }).exec()
  res.render('SwapList',{swapList,myProductOffer,userLogin})
  /*
  items.find({type: 'swap', Dealing_User: 'none'}).sort({ _id: -1 }).exec()
  .then(allItems => {allItems;
    swapList = allItems
    res.render('SwapList',{swapList,myProductOffer,userLogin})
  })
  .catch(err => {
    console.error(err);
  });
  */
});

//function on Giveaway page.
app.get('/GiveList', async (req, res) => {
  const giveList = await items.find({type: 'giveaway', Dealing_User: 'none'}).sort({ _id: -1 }).exec()
  res.render('GiveList',{giveList,myProductOffer,userLogin});

  /*
  items.find({type: 'giveaway', Dealing_User: 'none'}).sort({ _id: -1 }).exec()
  .then(allItems => {allItems;
    giveList = allItems 
    res.render('GiveList',{giveList,myProductOffer,userLogin});
  })
  .catch(err => {
    console.error(err);
  });
  */
});

//function on Swap/giveaway page หรือหน้าลงทะเบียน
app.get('/swapGive', (req, res) => {

  res.render('swapGive')
});
app.get('/userInfo', (req, res) => { //หน้า review
  res.render('userInfo')
});
app.get('/profile', async (req, res) => { //ดึงข้อมูลนักศึกษามาเป็นตัวแปรไว้เรียกใช้
    let addressData ='' //สร้างตัวแปรรับที่อยู่
    let phoneNumber ='' //สร้างตัวแปรรับเบอร์
    let lineID =''      //สร้างตัวแปรรับไลน์ไอดี

    studentNameTH = studentInfo.data.displayname_th;
    studentName = studentInfo.data.displayname_en;
    studentEmail = studentInfo.data.email;
    studentFaculty = studentInfo.data.faculty;
    studentDepartment = studentInfo.data.department;
    
    const userInfomations = await users.findOne({ username: userLogin }) //หาuserจาก username: userLogin ได้ userInfomations เป็น obj
    if (userInfomations) { //ทำเมื่อ หา username: userLogin เจอ
      addressData = userInfomations.address; //ที่อยู่
      phoneNumber = userInfomations.phoneNumber //เบอร์
      lineID = userInfomations.lineID //ไลน์ไอดี
    }

    /*
    users.find({ username: userLogin })    //หาข้อมูลผู้ใช้จาก รหัสนักศึกษา(userLogin)  
      .then(userInfomations => { //ได้ข้อมูลมาเป็น Array ที่แต่ละ Index เป็น json
        if (userInfomations.length > 0) {
          addressData = userInfomations[0].address;      
        }
      })
      .catch(err => {
        console.error(err);
      });
    */

  //แสดง list product ที่ลงทะเบียนไว้/ข้อมูลนักศึกษา
    const myProductDisplay = await items.find({ idOwner: userLogin, available: true }).sort({ _id: -1 }).exec() //หาไอเทมเราทั้งหมด
    myProductOffer = await items.find({ idOwner: userLogin, type: 'swap', available: true }).sort({ _id: -1 }).exec() //หาไอเทม(Swap)เราทั้งหมด
    res.render('profile', {
      studentNameTH,
      studentName,
      studentEmail,
      studentFaculty,
      studentDepartment,
      addressData,
      myProductDisplay,
      myProductOffer,
      phoneNumber,
      lineID
    });
    const updatedUser = await users.findOneAndUpdate( //หา user จาก username: userLogin แล้วอัพเดทเวลา
      { username: userLogin }, 
      {
        $set: {
          date: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + " " +
            today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }
      },
      { new: true }        
    )
    if (updatedUser !== null) { // หา user จาก username: userLogin เจอ
      console.log('username: ', updatedUser.username, ' successfully login');
      console.log('Date login updated:', updatedUser.date);
    }else { //กรณีหา user ไม่เจอ = สร้างข้อมูล user ใหม่
      const newUser = new users({
        username: userLogin,
        name: studentInfo.data.displayname_en,
        rating: 4.2,
        phoneNumber: '-',
        lineID: '-',
        email: studentInfo.data.email,
        address: '-',
        img1: 'String'
        
      });    
      newUser.save()
        .then(savedUser => {
          console.log('New user saved:', savedUser.username);
        })
        .catch(error => {
          console.error('Error saving new user:', error);
        });
    }
  })  

/*  
    items.find({ idOwner: userLogin, available: true }).sort({ _id: -1 }).exec()
    .then(allItems => {
      myProductDisplay = allItems;
      items.find({ idOwner: userLogin, type: 'swap', available: true }).sort({ _id: -1 }).exec()
        .then(allItems => {
          myProductOffer = allItems;  
          res.render('profile', {
            studentNameTH,
            studentName,
            studentEmail,
            studentFaculty,
            studentDepartment,
            addressData,
            myProductDisplay,
            myProductOffer
          });     
        })
        .catch(err => {
          console.error(err);
        });

        users.findOneAndUpdate(
          { username: userLogin },
          {
            $set: {
              date: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + " " +
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            }
          },
          { new: true }        
        )//กรณีหา user ไม่เจอ = สร้างข้อมูล user ใหม่
          .then(updatedUser => {
            if (updatedUser !== null) {
              console.log('username: ', updatedUser.username, ' successfully login');
              console.log('Date login updated:', updatedUser.date);
            } else {
              const newUser = new users({
                username: userLogin,
                name: studentInfo.data.displayname_en,
                rating: 4.2,
                phoneNumber: 'String',
                email: studentInfo.data.email,
                address: '-',
                img1: 'String',
              });    
              newUser.save()
                .then(savedUser => {
                  console.log('New user saved:', savedUser.username);
                })
                .catch(error => {
                  console.error('Error saving new user:', error);
                });
            }
          })
          .catch(err => {
            console.error('Error updating user info:', err);
          });

        //วันที่        
      users.findOneAndUpdate(
        { username: userLogin },
        {
          $set: {
            date: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + " " +
              today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
          }
        },
        { new: true }        
      )//กรณีหา user ไม่เจอ = สร้างข้อมูล user ใหม่
        .then(updatedUser => {
          if (updatedUser !== null) {
            console.log('username: ', updatedUser.username, ' successfully login');
            console.log('Date login updated:', updatedUser.date);
          } else {
            const newUser = new users({
              username: userLogin,
              name: studentInfo.data.displayname_en,
              rating: 4.2,
              phoneNumber: 'String',
              email: studentInfo.data.email,
              address: '-',
              img1: 'String',
            });    
            newUser.save()
              .then(savedUser => {
                console.log('New user saved:', savedUser.username);
              })
              .catch(error => {
                console.error('Error saving new user:', error);
              });
          }
        })
        .catch(err => {
          console.error('Error updating user info:', err);
        });

    })
    .catch(err => {
      console.error(err);
    });
});
*/

//update address/contact
app.post('/profile/editAddress', async (req, res) => {
  await users.findOneAndUpdate(
    { username: userLogin },
    {
      $set: {
        address: req.body.addressContainer,
        lineID: req.body.lineID,
        phoneNumber: req.body.phoneNumber
      }
    },
    { new: true }
  )
    .then(updatedUser => {
      console.log('Address updated:', updatedUser);      
    })
    .catch(err => {
      console.error('Error updating Address:', err);
    });

    addressData = req.body.addressContainer;
  res.redirect('/profile')
});

//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
//ยังไม่รู้ว่าทำอะไร
app.get('/profile-swap', async (req, res) => {  
  let profile_Swap_Dealing_TargetItems = []
  let profile_Swap_Dealing_MyItems = []  
  let profile_Swap_Offer_MyOffer_TargetItems = []
  let profile_Swap_Offer_MyOffer_MyItems = []
  let profile_Swap_Offer_ReceiveAnOffer_TargetItems = []
  let profile_Swap_Offer_ReceiveAnOffer_MyItems = []

  //profile_Swap_Offer_MyOffer
  Offer_MyOffer_TargetItems = await items.find({ offeror: userLogin , type: 'swap', Dealing_User: 'none', available: true })//ค้าหา ไอเทม ทุกตัว ที่มี offeror ตรงกับไอดีของเรา  
  for (const TargetItem of Offer_MyOffer_TargetItems) {
    const offerors = TargetItem.offeror
    for (const offeror of offerors) {
      if (offeror == userLogin){
        const index = offerors.indexOf(offeror);
        const MyItem = await items.findById(TargetItem.itemExchange[index])
        profile_Swap_Offer_MyOffer_MyItems.push(MyItem)
        profile_Swap_Offer_MyOffer_TargetItems.push(TargetItem)
      }
    }    
  }
  //profile_Swap_Offer_ReceiveAnOffer
  const Offer_ReceiveAnOffer_MyItems = await items.find({ idOwner: userLogin , type: 'swap', Dealing_User: 'none', available: true })
  for (const MyItem of Offer_ReceiveAnOffer_MyItems) {
    const offerors = MyItem.offeror
    for (const offeror of offerors) {      
      const index = offerors.indexOf(offeror);
      const TargetItem = await items.findById(MyItem.itemExchange[index])
      profile_Swap_Offer_ReceiveAnOffer_TargetItems.push(TargetItem)
      profile_Swap_Offer_ReceiveAnOffer_MyItems.push(MyItem)
    }
  }
  //profile_Swap_Dealing
  const Dealing_MyItems = await items.find(
    {$or: [
      { idOwner: userLogin , type: 'swap', Dealing_User: { $ne: 'none' }, available: true  },
      { Dealing_User: userLogin , type: 'swap', available: true }
    ]}
  )  
  for (const Dealing_MyItem of Dealing_MyItems) {
    const TargetItem = await items.findById(Dealing_MyItem.Dealing_Item)
    profile_Swap_Dealing_TargetItems.push(TargetItem)
    profile_Swap_Dealing_MyItems.push(Dealing_MyItem)        
  }

  res.render('profile-swap',{
    userLogin,
    myProductOffer,
    profile_Swap_Dealing_MyItems,
    profile_Swap_Dealing_TargetItems,
    profile_Swap_Offer_MyOffer_TargetItems,
    profile_Swap_Offer_MyOffer_MyItems,
    profile_Swap_Offer_ReceiveAnOffer_TargetItems,
    profile_Swap_Offer_ReceiveAnOffer_MyItems
  });
});
  /*
  //profile_Swap_Offer_MyOffer
  items.find({ offeror: userLogin , type: 'swap', Dealing_User: 'none', available: true })//ค้าหา ไอเทม ทุกตัว ที่มี offeror ตรงกับไอดีของเรา  
  .then(MyOffer_TargetItems => { //นำข้อมูลที่ได้ข้างบนมาเก็บใน MyOffer_TargetItems
    let promises2 = [];
    //MyOffer_TargetItems คือ ไอเทมทั้งหมดที่มี offerer ตรงกับ ID ของเรา
    for (let i = 0; i < MyOffer_TargetItems.length; i++) { //ทำงานเท่ากับจำนวนไอเทมที่เรากดOffer
      for (let j = 0; j < MyOffer_TargetItems[i].itemExchange.length; j++) { //ทำงานเท่ากับจำนวน.itemExchange ของTargetItems[i]
        //หาว่า ID ของเราตรงกับ Offerer ลำดับที่เท่าไหร่ เพื่อ Push เฉพาะ ตอนที่ ID ตรงกับของเรา
        if (MyOffer_TargetItems[i].offeror[j] == userLogin) { //ไอเทมที่มี offerer ตรงกับ ID ของเรา ตัวที่ i มี offeror ลำดับที่ j ตรงกับ ID ของเราไหม
          let promise2 = items.findOne({ _id: MyOffer_TargetItems[i].itemExchange[j] })
            .then(Target_ExchangeItems => {
              // Work with the found document
              profile_Swap_Offer_MyOffer_TargetItems.push(MyOffer_TargetItems[i]);//ไอเทมของเรา ที่มี offeror[j] == userLogin
              profile_Swap_Offer_MyOffer_MyItems.push(Target_ExchangeItems);//ไอเทมของเรา ที่มากจาก MyOffer_TargetItems[i].itemExchange[j]
            })
            .catch(err => {
              // Handle errors
              console.error(err);
            });

          promises2.push(promise2);
        }
      }
    }

    // Wait for all promises to resolve
    return Promise.all(promises2);
  })
  //profile_Swap_Offer_ReceiveAnOffer
  items.find({ idOwner: userLogin , type: 'swap', Dealing_User: 'none', available: true })
  .then(mySwapProduct => {
    let promises = [];    
    for (let i = 0; i < mySwapProduct.length; i++) { //ลูป=จำนวนไอเทมของเรา
      if (mySwapProduct[i].itemExchange.length > 0) { //เข้าเงิ่อนไขเมื่อ mySwapProduct[i] มี itemExchange  (มีคนกดเสนอมา)     
        for (let j = 0; j < mySwapProduct[i].itemExchange.length; j++) { //ลูป=จำนวน itemExchange ที่อยู่ใน mySwapProduct แต่ละอัน
          let promise = items.findOne({ _id: mySwapProduct[i].itemExchange[j] }) //หา itemExchange แต่ละอัน ในไอเทมของเรา
            .then(itemExchange => {
              profile_Swap_Offer_ReceiveAnOffer_MyItems.push(mySwapProduct[i]);//ไอทมเรา (ถ้าไอเทมนี้มีitemExchangeหลายอัน mySwapProduct[i] ก็จะถูก push หลายรอบ)
              profile_Swap_Offer_ReceiveAnOffer_TargetItems.push(itemExchange);//ไอเทมที่คนอื่นเสนอมา
            })
            .catch(err => {
              console.error(err);
            });

          promises.push(promise);
        }
      }
    }

    return Promise.all(promises);
  })
  //profile_Swap_Dealing
  items.find({ idOwner: userLogin , type: 'swap', Dealing_User: { $ne: 'none' }, available: true })
  .then(myDealingSwapProduct => {
    let promises = [];
    for (let i = 0; i < myDealingSwapProduct.length; i++) { 
      profile_Swap_Dealing_MyItems.push(myDealingSwapProduct[i]);
      // Pushing the promise itself, not the resolved value
      promises.push(items.findOne({ _id: myDealingSwapProduct[i].Dealing_Item }));
    }

    // Waiting for all promises to resolve
    return Promise.all(promises)
      .then(targetItems => {
        profile_Swap_Dealing_TargetItems = targetItems
        // targetItems is an array of resolved values from promises
        return targetItems; // Pass resolved values to the next `then()` block
      });
  })
  .then(() => {      
    setTimeout(() => {
      res.render('profile-swap',{
          userLogin,
          myProductOffer,
          profile_Swap_Dealing_MyItems,
          profile_Swap_Dealing_TargetItems,
          profile_Swap_Offer_MyOffer_TargetItems,
          profile_Swap_Offer_MyOffer_MyItems,
          profile_Swap_Offer_ReceiveAnOffer_TargetItems,
          profile_Swap_Offer_ReceiveAnOffer_MyItems
      });
  }, 300);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
  */

//เรียกหน้า history
app.get('/profile-history', async (req, res) => {
  let profile_History_Swap_MyItems = []
  let profile_History_Swap_TargetItems = []
  let profile_History_Give_MyItems = []
  let profile_History_Give_TargetOfferor = []

  profile_History_Swap_MyItems = await items.find(
    {$or: [
      { idOwner: userLogin , type: 'swap', Dealing_User: { $ne: 'none' }, available: false },
      { Dealing_User: userLogin , type: 'swap', available: false }
    ]})
  for (const MyItem of profile_History_Swap_MyItems) {
    const waitData = await items.findById(MyItem.Dealing_Item);    
    profile_History_Swap_TargetItems.push(waitData);    
  }

  profile_History_Give_MyItems = await items.find(
    {$or: [
      { idOwner: userLogin , type: 'giveaway', Dealing_User: { $ne: 'none' }, available: false },
      { Dealing_User: userLogin , type: 'giveaway', available: false }
    ]})
  for (const MyItem of profile_History_Give_MyItems) {
    const waitData = await users.findOne({username: MyItem.Dealing_User});    
    profile_History_Give_TargetOfferor.push(waitData);    
  }
  
  res.render('profile-history',{
    profile_History_Swap_MyItems,
    profile_History_Swap_TargetItems,
    profile_History_Give_MyItems,
    profile_History_Give_TargetOfferor
  })
});

//เรียกดู giveaway ในหน้า profile
app.get('/profile-giveaway', async (req, res) => {
  let profile_Give_Dealing_Offerer = [];
  let profile_Give_Dealing_MyItems = [];
  let profile_Give_Offer_MyOffer_TargetItems = []; // Items where the offeror matches userLogin
  let profile_Give_Offer_MyOffer_MyID = []; // UserLogin
  let profile_Give_Offer_ReceiveAnOffer_Offerer = []; // IDs of users who made offers
  let profile_Give_Offer_ReceiveAnOffer_MyItems = []; // Items of the current user with offers
  
  try {
    // Concurrent execution of both queries
    const [MyOffer_TargetItems, ReceiveAnOffer_MyItems, Dealing_MyItems] = await Promise.all([
      items.find({ offeror: userLogin, type: 'giveaway', Dealing_User: 'none' , available: true }), //หา ไอเทม ที่เรากด offer ไปใส่ MyOffer_TargetItems
      items.find({ idOwner: userLogin, type: 'giveaway', Dealing_User: 'none' , available: true }), //หา ไอเทม ทั้งหมดของเรา ไปใส่ ReceiveAnOffer_MyItems
      items.find(
        {$or: [
          { idOwner: userLogin, type: 'giveaway',Dealing_User: { $ne: 'none' } , available: true  },
          { Dealing_User: userLogin, type: 'giveaway', available: true }
        ]}
        )     
    ]);
    
    
    // Populate arrays for MyOffer_TargetItems
    for (const item of MyOffer_TargetItems) { //ลูปทำงานเท่ากับจำนวน MyOffer_TargetItems //ลูปแต่ละครั้ง จะเก็บ MyOffer_TargetItems[index] 1 ตัว ที่ item
      for (const offerorItem of item.offeror) { //ลูปทำงานเท่ากับจำนวน item.offeror
        profile_Give_Offer_MyOffer_TargetItems.push(item); 

        let [MyOffer_ID] = await Promise.all([
          users.find({username: offerorItem})          
        ]);
        for (let i = 0; i < MyOffer_ID.length; i++) {
          profile_Give_Offer_MyOffer_MyID.push(MyOffer_ID[i]);          
        }        
      }
    }

    // Populate arrays for ReceiveAnOffer_MyItems
    const promises = [];
    for (const item of ReceiveAnOffer_MyItems) {
      if (item.offeror.length > 0) { //ดูว่ามีคนส่ง offer มาที่ไอเทมของเราไหม ถ้ามีถึงจะทำข้างล่าง
        for (const offerorID of item.offeror) { //เมื่อเจอไอเทมของเราที่มี offeror.length > 0
          const promise = users.findOne({ username: offerorID })
            .then(offeror => { //ได้ข้อมูล user ที่มี username: offerorID 1 คน
              profile_Give_Offer_ReceiveAnOffer_MyItems.push(item);
              profile_Give_Offer_ReceiveAnOffer_Offerer.push(offeror);
            })
            .catch(err => {
              console.error(err);
            });
          promises.push(promise);
        }
      }
    }

    //profile_Give_Dealing
    for (let i = 0; i < Dealing_MyItems.length; i++) {
      let [Dealing_Offerer] = await Promise.all([
        users.find({username: Dealing_MyItems[i].Dealing_User})
      ]);
      profile_Give_Dealing_MyItems.push(Dealing_MyItems[i]);
      profile_Give_Dealing_Offerer.push(Dealing_Offerer[0]);
      }

    // Wait for all promises to resolve
    await Promise.all(promises);

    
    res.render('profile-giveaway', {      
      myProductOffer,
      profile_Give_Dealing_MyItems,
      profile_Give_Dealing_Offerer,
      profile_Give_Offer_MyOffer_TargetItems,
      profile_Give_Offer_MyOffer_MyID,
      profile_Give_Offer_ReceiveAnOffer_Offerer,
      profile_Give_Offer_ReceiveAnOffer_MyItems
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/contact', async (req, res) => {
  res.redirect('/profile-swap')
});
//เรียกดูข้อมูลของ partner ที่ทำการแลกเปลี่ยนด้วย
app.post('/contact', async (req, res) => {
  Contact_ItemID = req.body.ItemID
  Contact_Item = await items.findOne({ _id: Contact_ItemID})
  itemsOwnerID = Contact_Item.idOwner
  if (itemsOwnerID === userLogin) {
    itemsOwnerID = Contact_Item.Dealing_User
  }
  ContactAddress_User = await users.findOne({ username: itemsOwnerID})
  ContactAddress = ContactAddress_User.address
  phoneNumber = ContactAddress_User.phoneNumber
  lineID = ContactAddress_User.lineID

  
  const options_MS = {
    method: 'GET',
    hostname: 'restapi.tu.ac.th',
    path: `/api/v2/profile/std/info/?id=${itemsOwnerID}`,
    headers: {
      'Content-Type': 'application/json',
      'Application-Key': 'TU8c99286ccddd6571357ee5fb3d4ee059d86bb37dbb3f3c6d4c20e1a440a8733cf6b9091cf6bb6918aee800a2ed5a0ca0'
    }
  };

  const req_MS = https.request(options_MS, function (res_MS) {
    let chunks = [];

    res_MS.on('data', function (chunk) {
      chunks.push(chunk);
    });

    //partner info set ตัวแปร
    res_MS.on('end', function () {
      const body = Buffer.concat(chunks);
      const itemsOwnerInfo = JSON.parse(body);

      const MS_studentNameTH = itemsOwnerInfo.data.displayname_th;
      const MS_studentName = itemsOwnerInfo.data.displayname_en;
      const MS_studentEmail = itemsOwnerInfo.data.email;
      const MS_studentFaculty = itemsOwnerInfo.data.faculty;
      const MS_studentDepartment = itemsOwnerInfo.data.department;
      const MS_addressInput = ContactAddress //'1146/135 หมู่5 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ 10270';
      res.render('contact', {
        Contact_Item,
        phoneNumber,
        lineID,
        MS_studentNameTH,
        MS_studentName,
        MS_studentEmail,
        MS_studentFaculty,
        MS_studentDepartment,
        MS_addressInput        
      });
    });

    res_MS.on('error', function (error) {
      console.error(error);
    });
  });

  req_MS.end();
});

app.post('/dealingConfirm', async (req, res) =>{
  Contact_Confirm_itemID = req.body.ItemID
  try {
    if (await items.findOne({ _id: Contact_Confirm_itemID, Confirm_Count: userLogin })) {
      res.send('<script>alert("You already confirm once!"); window.location.href = "/profile-swap";</script>')
    } else {
      const updatedItem = await items.findOneAndUpdate(
          { _id: Contact_Confirm_itemID }, // Search criteria
          {
            $push: {
              Confirm_Count: userLogin
            }
          },
          { new: true } // Return the updated document
        );
        if(updatedItem.Confirm_Count.length === 2){
          const updated_available = await items.findOneAndUpdate(
            { _id: Contact_Confirm_itemID }, // Search criteria
            { available: false }, // Update data        
            { new: true } // Return the updated document
          );    
          const updatedOfferItem_available = await items.findOneAndUpdate(
            { _id: updatedItem.Dealing_Item }, // Search criteria
            { available: false,
              type: 'none'
             }, // Update data
            { new: true } // Return the updated document
          );
          console.log(updated_available, updatedOfferItem_available);
        }
      
      // Print the updated user
      res.send('<script>alert("Successfully confirm the deal!"); window.location.href = "/profile-swap";</script>')
      
    } 
  } catch (error) {
    console.error('Error updating user:', error);
  }
  

})
app.post('/dealingCancel', async (req, res) =>{
  Contact_Cencel_itemID = req.body.ItemID
  try {
    // Find the user by username and update their age
    const updatedItem = await items.findOneAndUpdate(
      { _id: Contact_Cencel_itemID }, // Search criteria
      { Dealing_User: 'none' , Dealing_Item: 'none'}, // Update data
      { new: true } // Return the updated document
    );

    // Print the updated user
    console.log(updatedItem);
  } catch (error) {
    console.error('Error updating user:', error);
  }
  res.redirect('/home');
})

//button addSwap ไปหน้า addSwap
app.get('/addSwap', (req, res) => {
  res.render('addSwap')
});

//ใส่ข้อมูลลงทะเบียน addswap
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

  //ข้อมูลของที่ลงทะเบียน
  const newItem = new items({
    idOwner: userLogin,
    idReceiver: 'idReceiver',
    nameOwner: studentInfo.data.displayname_en,
    type: 'swap',
    nameItem: inputItemName,
    ratingOwner: 4.5,
    condition: inputCondition ,
    shipment: inputShipment,
    interesting: interest,
    category: inputCategory,
    description: inputDescription,  
    img2: inputImg2,
    img5: inputImg5,
    img6: inputImg6,
    available: true,
    Dealing_User: 'none',
    Dealing_Item: 'none',
  })
  //สร้างทุกรอบ สร้างไว้แค่บนเซิฟเวอ ยังไม่บันทึกลงดาต้าเบส จะบันทึกลงไปหลังจากตำสั่งsave
  //คอสบนUdemyใช้
  //โครงสร้างตอนบันทึก 
  //กำหนด
  newItem.save()
.then(savedItem => {
  console.log('Item saved');
  // res.render('home')
  res.redirect('/home');

})
.catch(error => {
  console.error('Error saving User:', error);
});

});

//ลงทะเบียน giveaway
app.get('/addGive', (req, res) => {
  res.render('addGive')
});
app.post('/addGive/makelist', (req, res) => {
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

  //แสดงข้อมูลลงทะเบียน giveaway
  const newItem = new items({
    idOwner: userLogin,
    idReceiver: 'idReceiver',
    nameOwner: studentInfo.data.displayname_en,
    type: 'giveaway',
    nameItem: inputItemName,
    ratingOwner: 4.5,
    condition: inputCondition ,
    shipment: inputShipment,
    interesting: interest,
    category: inputCategory,
    description: inputDescription,  
    img2: inputImg2,
    img5: inputImg5,
    img6: inputImg6,
    available: true,
    Dealing_User: 'none',
    Dealing_Item: 'none',
  })

  newItem.save()
.then(savedItem => {
  console.log('Item saved');
  res.redirect('/home');

})
.catch(error => {
  console.error('Error saving User:', error);
});

  // console.log(inputItemName,inputCategory,inputCondition,interest,inputShipment,inputDescription,inputImg2,inputImg5,inputImg6)
});

app.get('/navigation', (req, res) => {
  res.render('nav2'); // Renders the nav2.ejs template and sends HTML as a response
});

//เรียกแสดงหน้า profile หลัก
app.get('/profileWindow', (req, res) => {
  res.render('profileWindow', { url: req.originalUrl }); // Renders the profileWindow.ejs template and sends HTML as a response
});

//ลบไอเทมออกใน my product
app.post('/items/delete/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedItem = await items.findByIdAndDelete(productId);
    if (!deletedItem) {
      console.log('Item not found.');
      // Handle accordingly if the item is not found
    } else {
      console.log('Deleted item:', deletedItem);

      res.send('<script>alert("Item deleted successfully!"); window.location.href = "/profile";</script>');
      
      // Handle success, maybe redirect or send a success response
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.send('<script>alert("Item deleted eror!");</script>');
    // Handle the error, send an error response or redirect to an error page
  }
});

app.post('/DeleteSwapOffer', async (req, res) => {
  const DeleteSwapOffer_ItemID = req.body.ItemID;
  const OfferItemID = req.body.OfferItemID;
  
  try {
    // Find the document by its _id
    const DeleteSwapOffer_MyItem = await items.findById(DeleteSwapOffer_ItemID);
    
    // Find the index of the OfferItemID in the offeror array
    const deleteIndex = DeleteSwapOffer_MyItem.itemExchange.indexOf(OfferItemID);
    
    // Remove the corresponding elements from both arrays
    if (deleteIndex !== -1) {
      DeleteSwapOffer_MyItem.offeror.splice(deleteIndex, 1);
      DeleteSwapOffer_MyItem.itemExchange.splice(deleteIndex, 1);
    }
    
    // Save the updated document
    await DeleteSwapOffer_MyItem.save();
    console.log("Offer removed successfully.");
    
    res.send('<script>alert("Offer deleted successfully!"); window.location.href = "/profile-swap";</script>');
  } catch (error) {
    console.error("Error removing Offer:", error);
    res.status(500).send("Error removing Offer");
  }
});
app.post('/DeleteGiveOffer', async (req, res) => {
  const DeleteGiveOffer_ItemID = req.body.ItemID;
  const OfferorID = req.body.OfferorID;
  
  try {
    // Find the document by its _id
    const DeleteGiveOffer_MyItem = await items.findById(DeleteGiveOffer_ItemID);
    
    // Find the index of the OfferorID in the offeror array
    const deleteIndex = DeleteGiveOffer_MyItem.offeror.indexOf(OfferorID);
    
    // Remove the corresponding elements from both arrays
    if (deleteIndex !== -1) {
      DeleteGiveOffer_MyItem.offeror.splice(deleteIndex, 1);
      DeleteGiveOffer_MyItem.itemExchange.splice(deleteIndex, 1);
    }
    
    // Save the updated document
    await DeleteGiveOffer_MyItem.save();
    console.log("Offer removed successfully.");
    
    res.send('<script>alert("Offer deleted successfully!"); window.location.href = "/profile-giveaway";</script>');
  } catch (error) {
    console.error("Error removing Offer:", error);
    res.status(500).send("Error removing Offer");
  }
});

//ยื่นข้อเสนอขอแลกเปลี่ยนให้ partner
app.post('/makeOffer-swap', async (req, res) => {
  try {
    const targetItemID = req.body.targetItemID;
    const myProductOfferId = req.body.selectProductOffer;
    if(!myProductOfferId){
      res.send('<script>alert("You did not select your item"); window.location.href = "/home";</script>')
    }else{
      const updatedItem = await items.findOneAndUpdate(
        { _id: targetItemID },
        {
          $push: {
            offeror: userLogin,
            itemExchange: myProductOfferId
          }
        },
        { new: true }
      );
      console.log("Successfully send Offer");    
      console.log(updatedItem);
      res.redirect('/home');
    }
    
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send('Error making offer');
  }
});
app.post('/makeOffer-give', async (req, res) => {
  try {
    const targetItemID = req.body.targetItemID;
    const OfferId = req.body.myID;
    
    const updatedItem = await items.findOneAndUpdate(
      { _id: targetItemID },
      {
        $push: {
          offeror: OfferId,
          itemExchange: 'giveaway'
        }
      },
      { new: true }
    );
    console.log("Successfully send Offer");    
    console.log(updatedItem);
    res.redirect('/home');
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send('Error making offer');
  }
});

app.post('/makeSwapDeal', async (req, res) => {
  try {    
    const updatedItem = await items.findOneAndUpdate(
      { _id: req.body.myItemID },
      {
        $set: {
          Dealing_User: req.body.offerorID,
          Dealing_Item: req.body.exchangeItemID
        }
      },
      { new: true }
    );
    console.log("Successfully accept an offer!");    
    console.log('updatedItem: ',updatedItem);
    res.redirect('/profile-swap');
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send('Error accepting an offer');
  }
});
app.post('/makeGiveawayDeal', async (req, res) => {
  try {    
    const updatedItem = await items.findOneAndUpdate(
      { _id: req.body.myItemID },
      {
        $set: {
          Dealing_User: req.body.offerorID,
          Dealing_Item: 'Dealing'
        }
      },
      { new: true }
    );
    console.log("Successfully accept an offer!");    
    console.log('updatedItem: ',updatedItem);
    res.redirect('/profile-giveaway');
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send('Error accepting an offer');
  }
});

app.get('*', (req, res) => {
  res.send('<h1>This Page Do Not Exit!!!</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  
});