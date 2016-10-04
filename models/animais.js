import model from 'seraph-model';
import config from '../config.js';

module.exports = (app, db) => {
  const animais = model(db, `animais${config.neo4j.envDb}`);

  animais.schema = {
    nome: { type: String, trim: true, required: true },
    raca: { type: String, trim: true, required: true },
    idade: { type: String, required: true },
    situacao: { type: String, required: true },
    especie: { type: String, required: true }
  };

  return animais.db;
};
