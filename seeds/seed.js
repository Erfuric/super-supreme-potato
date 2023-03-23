const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');
const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const blogposts = await BlogPost.bulkCreate(
    blogpostData.map((post) => {
      return {
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id
      };
    })
  );

  await Comment.bulkCreate(
    commentData.map((comment) => {
      return {
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: blogposts[Math.floor(Math.random() * blogposts.length)].id
      };
    })
  );

  process.exit(0);
};

seedDatabase();