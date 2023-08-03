const router = require('express').Router();
// const Post  = require('../models/Post');
// const Comment = require('../models/Comment') 
// const User = require('../models/User') 
const { Post, Comment, User } = require("../models");

router.get('/', async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const posts = await Post.findAll({
    include: [User, Comment],
  });

  const post =posts.map((post) => post.get({ plain: true }));
console.log(post)
  // const post = await Post.findAll({raw: true});

  console.log(user)



  res.render('index', {
     post: post,
     user: user
  });
});

// get one post

router.get("/post/:id", async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const post = await Post.findByPk(req.params.id, {
    include: [User, Comment]
  });

  console.log(post)
const plaintrue = post.get({ plain: true })
const comments = plaintrue.comments


  console.log("COMMENTS " + comments[0])
  // console.log("USER " + plaintrue.user.username)

  res.render("post", {
    post: post.get({ plain: true }),
    user: user,
    comments: comments
  });
});
//  to log in / register

router.get('/login', (req, res) => {

  res.render('auth/login');
});

router.get('/register', (req, res) => {

  res.render('auth/register');
});

module.exports = router;