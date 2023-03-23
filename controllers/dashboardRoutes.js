const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!postData) {
      console.error(`No posts found for user_id ${req.session.user_id}`);
      res.status(404).json({ message: `No posts found` });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('createPost', { logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      console.error(`No post found with id ${req.params.id}`);
      res.status(404).json({ message: `No post found with id ${req.params.id}` });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('editPost', { post, logged_in: true });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;