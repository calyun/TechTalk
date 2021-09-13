const router = require('express').Router();
const {
  User,
  Post
} = require('../models');
const {
  sync
} = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async function (req, res) {
  const postData = await Post.findAll({
    attributes: ['post_id', 'title', 'body', 'user_id'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['username'],
    }, ],
  })
  const posts = postData.map((post) => post.get({
    plain: true
  }));
  console.log(posts);
  res.render('home', {
    posts,
    loggedIn: req.session.logged_in,
    layout: 'main',
    view: 'home'
  });
});

router.get('/login', async (req, res) => {
  try {

    res.render('login')
  } catch (err) {
    res.status(500).json(err)
  }

});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;