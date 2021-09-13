const sequelize = require('../config/connection')

const userSeedData = require('./userSeedData.json')
const postSeedData = require('./postSeedData.json')
const replySeedData = require('./replySeedData.json')
const { User, Post, Reply} = require('../models')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n ----- DATABASE SYNCED ----- \n')

  const user = await User.bulkCreate(userSeedData)
  const post = await Post.bulkCreate(postSeedData)
  const reply = await Reply.bulkCreate(replySeedData)

  process.exit(0);
}

seedDatabase();
