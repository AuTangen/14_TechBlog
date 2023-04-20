const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post')
const Comment = require('../models/Comment') 
Post.belongsTo(User)
User.hasMany(Post)

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findOne({include: Post})
  const post = await Post.findAll({raw: true});
    // where: {
    // id:  req.session.user_id}
    //  } );
     console.log(user)
     console.log(req.session.user_id)

  res.render('private/dashboard', {
    username: user.username,
    post: post
  });
});

router.get('/newpost', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  res.render('private/newpost', {
    username: user.username
  });
});

router.post("/newpost", isAuthenticated, async (req, res) => {
  const post_data = req.body;
  

  
    const newpost = await Post.create(post_data);
    console.log(newpost)
    res.redirect('/');

});

module.exports = router;