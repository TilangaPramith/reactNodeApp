const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const sql = require('./database/db');

const app = express();

app.use(cors());
app.use(body.json());
app.use(body.urlencoded({extended:false}));

const Users = require('./routes/Users');

app.use('/users',Users);


app.listen(5010,function(){
    console.log('5010 port run');
})