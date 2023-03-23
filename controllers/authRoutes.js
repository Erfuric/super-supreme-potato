const router = require('express').Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
  try {
    console.log('Render login page');
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Received POST request to login');
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      console.log('Invalid username or password');
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Invalid username or password');
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      console.log(`User ${user.username} logged in`);
      res.json(user);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  try {
    console.log('Received POST request to logout');
    if (req.session.logged_in) {
      req.session.destroy(() => {
        console.log('User logged out');
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;