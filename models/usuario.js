import model from 'seraph-model';
import config from '../config.js';

module.exports = (app, db) => {
  const usuario = model(db, `usuario${config.neo4j.envDb}`);

  usuario.schema = {
    nome: { type: String, trim: true, required: true },
    endereco: { type: String, trim: true, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    fone: { type: String, required: true },
    foto: { type: String}
  };

  return usuario.db;
};
