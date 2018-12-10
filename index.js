const express = require('express');
const fetch = require('node-fetch');
const optimizely = require('@optimizely/optimizely-sdk');
const morgan = require('morgan')
const defaultLogger = require('@optimizely/optimizely-sdk/lib/plugins/logger');
const LOG_LEVEL = require('@optimizely/optimizely-sdk/lib/utils/enums').LOG_LEVEL;

const handlers = require('./handlers');

const app = express();
const port = 3000;

console.log('⚙️  Downloading Optimizely datafile...');
const url = 'https://cdn.optimizely.com/json/12335270622.json';
fetch(url, { mode: 'cors' })
  .then(response => response.json())
  .then(datafile => {
    console.log('✅ Optimizely datafile obtained!');
    const optimizelyClientInstance = optimizely.createInstance({
      datafile,
      logger: defaultLogger.createLogger({
        logLevel: LOG_LEVEL.INFO,
        prefix: 'ℹ️  Optly SDK',
      }),
    });

    app.use(morgan('✨ :method :url :status :res[content-length] - :response-time ms'));
    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    app.get('/', handlers.homePage.bind(this, optimizelyClientInstance));

    app.listen(port, () => console.log(`🔥 Example app listening on port ${port}!`));
  })
  .catch(e => {
    console.error('🚨 Could not retreive datafile...');
    throw e;
  });
