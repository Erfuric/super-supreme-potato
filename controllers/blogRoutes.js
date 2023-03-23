const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, logged_in: req.session.logged_in });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: `No post found with id ${req.params.id}` });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('post', { post, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }]
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', { user, logged_in: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, (req, res) => {
  res.render('createPost', { logged_in: true });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

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