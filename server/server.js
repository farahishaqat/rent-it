const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const itemRoutes = require('./routes/item')

//app
const app = express();

//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
.then(()=> console.log('DB connected'))
.catch(err=> console.log(err));


//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//route middleware 
app.use('/api',itemRoutes)


//port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));