import model from 'seraph-model';
import config from '../config.js';

module.exports = (app, db) => {
  const animal = model(db, `animal${config.neo4j.envDb}`);

  animal.schema = {
    nome: { type: String, trim: true, required: true },
    raca: { type: String, trim: true, required: true },
    idade: { type: String, required: true },
    descricao: { type: String, required: true },
    especie: { type: String, required: true }
  };

  return animal.db;
};
