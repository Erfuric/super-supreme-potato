const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const posts = await Post.bulkCreate(
    postData.map((post) => {
      return {
        title: post.title,
        content: post.content,
        user_id: post.user_id
      };
    })
  );

  await Comment.bulkCreate(
    commentData.map((comment) => {
      return {
        content: comment.content,
        user_id: comment.user_id,
        post_id: comment.post_id
      };
    })
  );

  process.exit(0);
};

seedDatabase();
