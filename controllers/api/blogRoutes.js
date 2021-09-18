const router = require('express').Router();
const withAuth = require('../../utils/auth')

const {
  User,
  Post,
  Reply
} = require('../../models');

router.get("/:id", async function (req, res) {
  const postData = await Post.findOne({
    where: {
      post_id: req.params.id,
    },
    attributes: ["post_id", "title", "body", "user_id", "created_at"],
    include: [{
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Reply,
        as: 'replies',
        attributes: ['reply_id', 'body', 'user_id', 'created_at'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username'],
        }],
      },
    ],
  });
  const post = postData.get({
    plain: true
  });
  console.log(post);

  let stringifiedArrDate = post.created_at.toString().split(' ');
  let organizedDate = `${stringifiedArrDate[0]} ${stringifiedArrDate[1]} ${stringifiedArrDate[2]} ${stringifiedArrDate[3]}`;
  let date = organizedDate;

  res.render('indivpost', {
    post,
    date,
    
    layout: 'main',
    view: 'indivpost'
  });
})

router.post('/new', (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id
  }).then((postData) => {
    console.log(postData);
    document.location.replace('/');
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  console.log(req.params.id);
  Post.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {
      post_id: req.params.id,
    }
  }).then((postData) => {
    res.json(postData);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({
        message: 'No post found with this id.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post reply go here
router.post('/reply', (req, res) => {
  Reply.create({
    body: req.body.body,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  }).then((replyData) => {
    console.log(replyData);
    document.location.replace('/');
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;