const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post')

router.post('/login', async (req, res) => {
  const user_data = req.body;
  
  const user = await User.findOne({
    where: {
      email: user_data.email
    }
  });
  const post = await Post.findAll({raw: true});
  if (!user) return res.redirect('/register');

  const valid_pass = await user.validatePass(user_data.password);

  if (!valid_pass) return res.redirect('/login');

  req.session.user_id = user.id;

  res.redirect('/dashboard');
});

router.post('/register', async (req, res) => {
  const user_data = req.body;

  try {
    const user = await User.create(user_data);
    console.log(user)
    req.session.user_id = user.id;
    res.redirect('/dashboard');
  } catch (err) {
    res.redirect('/login');
  }
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;