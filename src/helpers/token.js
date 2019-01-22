// token.js
const jwt = require('jsonwebtoken');
let config = require('./../config/config');
let JWTexcludedUrls = require('./JWTexcludedUrls').JWTexcludedUrls;
let filterUrl = require('./filterUrl').filterUrl;

// GetTokenFromHeader
exports.getTokenFromHeader = (headers) => {
	if (headers && headers.authorization) {
		let authorization = headers.authorization;
		let part = authorization.split(' ');
		if (part.length === 2) {
			return part[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

// Signing the token
exports.signToken = (user, expiry = config.jwtExpiry, secretKey = config.jwt.SECRET_KEY) => {
	return jwt.sign(user, secretKey , expiry);
};

// Verifying token from the user
exports.verifyToken = (req, res, next) => {
  let currUrl = req.url;
  //condition to skip authentication
  if (false) {
    next();
  } else {
    if (!filterUrl(JWTexcludedUrls, currUrl)) {
      // check header or url parameters or post parameters for token
      let token = this.getTokenFromHeader(req.headers);
      if (token) {
        let secretKey = /^\/api\/cms\//.test(currUrl) ? config.jwt.CMS_SECRET_KEY : config.jwt.SECRET_KEY;
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(403).send('Failed to authenticate token.');
          } else {
            req.decodedToken = decoded;
            next();
          }
        });

      } else {
        // if there is no token
        // return an error
        return res.status(400).send('No token was provided.');
      }
    } else {
      next();
    }
  }
};
