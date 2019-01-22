const folder = `${__dirname}/models`;
const fs = require('fs');

fs.readdirSync(folder).forEach(file => {
  require(`${folder}/${file}`);
});
