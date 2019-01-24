const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('mongo-morgan-ext');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').load();
require('./src/requireAllModels');
require('./src/config/dbConfig'); // Importing database connection when server starts
const errorMsg = require('./src/helpers/errorMessages').errorMessages;
const config = require('./src/config/config');
var routes = require('./src/routes/routes');
var responseTime = require('response-time');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql').default;
var app = express();

var path = require('path');
const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');

app.set('port', process.env.PORT || 8081);
app.use(responseTime());
//Security Middleware
app.use(helmet());

//Best practices app settings
app.set('title', 'Test');
app.set('query parser', `extended`);


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

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

//App activity logging
app.use(morgan(':method :url :date :remote-addr :status :response-time'));
app.use(logger(config.db.url + config.db.name, "logs"));

// create mail transporter
let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  "service": "gmail",
  "auth": {
    "user": "abhishekg@prdxn.com",
    "pass": process.env.PASSWORD
  }
});

const pathToMongoDb = config.db.url + config.db.name;
const host = process.env.HOST || 'http://localhost:8081/';
passwordless.init(new MongoStore(pathToMongoDb, {
  'mongostore': {
    'collection': 'userToken'
  }
}), {
  'allowTokenReuse': true
});
passwordless.addDelivery(function (tokenToSend, uidToSend, recipient, callback) {
  let mailOptions = {
    "from": "gupta137abhishek0@gmail.com",
    "to": recipient,
    "subject": `Magic Link Testing :)`,
    "text": 'Hello!\nYou can now access your account here: ' +
      host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend) + '&p=' + '12345678'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    }
    console.log("Email successfully sent!");
    callback(error);
  });
});

//Parses requests
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  'extended': true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Passwordless middleware
app.use(passwordless.acceptToken({
  "successRedirect": '/restricted'
}));

//Using the compression middleware
app.use(compression());

app.enable('etag'); // use strong etags
app.set('etag', 'strong');

//Handles routes in the app
app.use('/', routes);

// GraphQL API
app.use('/graphql', graphqlHTTP(() => ({
  'schema': schema,
  'graphiql': true,
  'pretty': true
})));

// When route is not found error messege is thrown
/* app.use('/', function (req, res) {
  res.status(404).send(errorMsg.restartApp);
}); */

/* eslint-disable no-unused-vars */
// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});
/* eslint-enable no-unused-vars */

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});