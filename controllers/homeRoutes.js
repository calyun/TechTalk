const router = require('express').Router();
const {
  User,
  Post
} = require('../models');
const {
  sync
} = require('../models/User');

const withAuth = require('../utils/auth')

router.get('/', async function (req, res) {
  const postData = await Post.findAll({
    attributes: ['post_id', 'title', 'body', 'user_id', 'created_at'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['username'],
    }, ],
  })
  const posts = postData.map((post) => post.get({
    plain: true
  }));

  posts.forEach(index => {
    let stringifiedArrDate = index.created_at.toString().split(' ')
    let organizedDate = `${stringifiedArrDate[0]} ${stringifiedArrDate[1]} ${stringifiedArrDate[2]} ${stringifiedArrDate[3]}`
    console.log(organizedDate)
    index.date = organizedDate
  })

  res.render('home', {
    posts,
    loggedIn: req.session.logged_in,
    layout: 'main',
    view: 'home'
  });
});

router.get('/dashboard', withAuth, async function (req, res) {
  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['post_id', 'title', 'body', 'user_id', "created_at"],
    include: [{
      model: User,
      as: 'user',
      attributes: ['username'],
    }, ],
  })

  const posts = postData.map((post) => post.get({
    plain: true
  }));
  
  posts.forEach(index => {
    let stringifiedArrDate = index.created_at.toString().split(' ')
    let organizedDate = `${stringifiedArrDate[0]} ${stringifiedArrDate[1]} ${stringifiedArrDate[2]} ${stringifiedArrDate[3]}`
    console.log(organizedDate)
    index.date = organizedDate
  })

  console.log(posts);
  res.render('dashboard', {
    posts,
    loggedIn: req.session.logged_in,
    layout: 'main',
    view: 'dashboard'
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