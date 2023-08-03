const router = require('express').Router();
// const User = require('../models/User');
// const Post = require('../models/Post')
// const Comment = require('../models/Comment') 
const { Post, Comment, User } = require("../models");

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {include: [Post]})
  const posts = await Post.findAll({
    where: {
    user_id:  req.session.user_id}
     });

     const post = posts.map((post) => post.get({ plain: true }));
     
     

  res.render('private/dashboard', {
    user: user,
    username: user.username,
    post: post
  });
});

router.get('/newpost', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  res.render('private/newpost', {
    user: user
  });
});

router.post("/newpost", isAuthenticated, async (req, res) => {
  // const user = await User.findByPk(req.session.user_id);

  const { title, content } = req.body;
  const user_id = req.session.user_id;
  
  const newPost = await Post.create({ title, content, user_id });
    console.log(newPost) 

    // console.log(user)
  
   res.redirect('/')


});

router.post("/post/:id", isAuthenticated, async (req, res) => {
 
  const post = await Post.findByPk(req.params.id, {
    include: User,
  });
  

  const { content } = req.body;
  const userId = req.session.user_id;
  const postId = post.id

  const comment = await Comment.create({content, user_id: userId, post_id: postId });


    console.log(comment)
    console.log("POST " + post)
    console.log("comment added!")
   res.redirect(`/post/${postId}`);


});


module.exports = router;