require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan');
const users = require('./routes/users')
const mongoose =require ('mongoose')
mongoose.connect('mongodb://localhost/db_rookie_ver2');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users)

app.listen(3000, () => console.log('listening on port 3000'))