// Routes.js
const express = require('express');
const router = new express.Router();
const cmsRoutes = require('./cmsRoutes');
const appRoutes = require('./appRoutes');
const cronRoutes = require('./cronRoute');
const tempRoutes = require('./tempRoute');

router.use('/cms', cmsRoutes);
router.use('/app', appRoutes);
router.use('/cron', cronRoutes);
router.use('/', tempRoutes);

module.exports = router;
