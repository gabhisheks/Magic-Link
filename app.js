const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('mongo-morgan-ext');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').load();
require('./src/requireAllModels'); // Importing database connection when server starts
const errorMsg = require('./src/helpers/errorMessages').errorMessages;
const config = require('./src/config/config');
var routes = require('./src/routes/routes');
var responseTime = require('response-time');
var app = express();

app.set('port', process.env.PORT || 8081);

app.use(responseTime());
//Security Middleware
app.use(helmet());

//Best practices app settings
app.set('title', 'Test');
app.set('query parser', `extended`);

require('./src/config/dbConfig'); // Importing database connection when server starts

const clientUrl = process.env.CLIENT_URL || config.client;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", clientUrl);
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, HEAD,PUT,DELETE");
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Verifying JWT Token
//let verifyToken = require('./src/helpers/token').verifyToken;
//app.use(verifyToken);

// serve static files
app.use(express.static('public'));

//App activity logging
app.use(morgan(':method :url :date :remote-addr :status :response-time'));
app.use(logger(config.db.url+config.db.name,"logs"));
//Parses requests
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 'extended': true }));

//Using the compression middleware
app.use(compression());

app.enable('etag'); // use strong etags
app.set('etag', 'strong');

//Handles routes in the app
app.use('/api', routes);

// When route is not found error messege is thrown
app.use('/', function(req, res) {
	res.status(404).send(errorMsg.restartApp);
});

/* eslint-disable no-unused-vars */
// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500).send(err.message || 'Internal Server Error');
});
/* eslint-enable no-unused-vars */

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
