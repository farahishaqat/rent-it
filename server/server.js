const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


//app
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//route : takes two argument path and a function
app.get('*', (req, res) => {
    res.json({
        data: 'You reached nodejs api for react node app'
    })
})


//port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));