var config = {};

config.db = {};
config.db.url = process.env.DB_URL || 'mongodb://localhost:27017/';
config.db.name = process.env.DB_NAME || 'capzone';
config.client = process.env.CLIENT_URL || '*';

module.exports = config;
