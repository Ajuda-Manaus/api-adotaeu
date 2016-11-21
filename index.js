import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import seraph from 'seraph';
import config from './config.js';
import session from 'express-session';
import passport from 'passport';

const app = express();
const db = seraph(config.neo4j);

app.use(cookieParser());
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

app.use(session({ secret: 'yoursecret' }));
app.use(passport.initialize());
app.use(passport.session());

consign(config.consign)
  .include('models')
  .then('controlers')
  .then('routes')
  .then('auth')
  .into(app, db)
;
require('./routes/usuario.js')(app, passport);


app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('adota-eu API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;