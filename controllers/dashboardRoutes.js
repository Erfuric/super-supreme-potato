const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
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
      res.status(404).json({ message: `No posts found` });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
  res.render('createPost', { logged_in: true });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: `No post found with id ${req.params.id}` });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('editPost', { post, logged_in: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
