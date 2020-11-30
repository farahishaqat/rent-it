const express = require('express');

const router = express.Router();

//import controllers meethod
const {create,list, read} = require('../controllers/post');

// post route
router.post('/post',create);
router.get('/posts', list);
router.get('/post/:slug',read);

module.exports = router;