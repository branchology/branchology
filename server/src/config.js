const environment = process.env.NODE_ENV || 'production';

let configurations;
if (environment === 'development' || environment === 'test') {
  configurations = require('../../config.json');
} else {
  configurations = require('./config.json');
}

export default configurations[environment];
