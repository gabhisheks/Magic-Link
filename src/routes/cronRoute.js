
const express = require('express');
const router = new express.Router();
const dependencies = require('./routesDependencies').default;

/*
 Functionality to include when starting the built up everytime
 */

// Fetch new ingresso events at 1am
dependencies.eventAutoUpdate.autoUpdate({
	'timers': process.env.Environment === 'release' ? '00 00 */8 * * *' : '00 00 * * * *',
	'cb': dependencies.eventAutoUpdate.cronOperation
});

module.exports = router;
