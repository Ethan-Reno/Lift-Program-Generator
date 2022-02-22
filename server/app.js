const express = require('express')
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const app = express();

// Middleware
app.use(bodyParser.json());
//app.use(auth);

// Import Routes
const postsRoute = require('./routes/posts.ts');
app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('We are on home');
});


// Connect to DB
// mongoose.connect(
//   'mongodb+srv://testuser:test123@cluster0.cxtx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   () => console.log('connected to DB!')
// );

// Listen to the server
app.listen(5000);

/*
Add your connection string into your application code

full driver code example:

const uri = "mongodb+srv://testuser:test123@cluster0.cxtx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/