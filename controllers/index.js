const router = require('express').Router();

const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/', homeRoutes);
router.use('/login', authRoutes);
router.use('/signup', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blog', blogRoutes);

// Console log statements to check the registered routes
console.log("Routes registered in index.js:");
router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`\t${r.route.path}`);
  }
});

module.exports = router;
