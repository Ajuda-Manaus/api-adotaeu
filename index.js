import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import seraph from 'seraph';
import config from './config.js';

const app = express();
const db = seraph(config.neo4j);

app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign(config.consign)
  .include('models')
  .then('controlers')
  .then('routes')
  .into(app, db)
;

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('adota-eu API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;