import model from 'seraph-model';
import config from '../config.js';

module.exports = (app, db) => {
  const fotos = model(db, `fotos${config.neo4j.envDb}`);

  fotos.schema = {
    path: { type: String, trim: true, required: true }
  };

  return fotos.db;
};
