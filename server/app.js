require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan');
const users = require('./routes/users')
const Storage = require('@google-cloud/storage');
const storage = new Storage();

//connection to mongo
const mongoose =require ('mongoose')
const getMongoUsername = process.env.mlabusername
const getMongoPassword = process.env.mlabpassword
mongoose.connect(`mongodb://${getMongoUsername}:${getMongoPassword}@ds147659.mlab.com:47659/e-commerce`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log('Connected to mongoose');
})

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users)

app.listen(3000, () => console.log('listening on port 3000'))