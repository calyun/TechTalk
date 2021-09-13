var router = require('express').Router();
const {
    Model,
    Post,
    User,
    Reply
} = require('../models');

const apiRoutes = require('./api')
const blogRouter = require('./api/blogRoutes');
const homeRoutes = require('./homeRoutes');
const withAuth = require('../utils/auth');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogRoutes', blogRouter)


 



module.exports = router;