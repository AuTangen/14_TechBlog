const router = require('express').Router();
const Post  = require('../models/Post');
const Comment = require('../models/Comment') 

router.get('/', async (req, res) => {
  const post = await Post.findAll({raw: true});

  res.render('index', {
     post: post
  });
});

router.get('/login', (req, res) => {

  res.render('auth/login');
});

router.get('/register', (req, res) => {

  res.render('auth/register');
});

module.exports = router;