var expressJoi =require('express-joi');


module.exports = function(app) {
	const usuario = app.models.usuario;

	// Use the Joi object to create a few schemas for your routes.
	this.schemaUsuarioAdd ={
	    nome: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    endereco: expressJoi.Joi.types.String().min(1).max(150).required(),
	    senha: expressJoi.Joi.types.String().regex(/^[a-zA-Z0-9]{3,30}$/),
	    email: expressJoi.Joi.types.String().email().required(),
	    foto: expressJoi.Joi.types.String().regex(/\.(jpe?g|png)$/i)
	};

	this.schemaUsuarioUpdate ={
		usuarioId: expressJoi.Joi.types.Number(),
	    nome: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    endereco: expressJoi.Joi.types.String().min(1).max(150).required(),
	    senha: expressJoi.Joi.types.String().regex(/^[a-zA-Z0-9]{3,30}$/),
	    email: expressJoi.Joi.types.String().email().required(),
	    foto: expressJoi.Joi.types.String().regex(/\.(jpe?g|png)$/i)
	};

	this.getAll = function(req, res){
		usuario.find({}, 'usuario', (err, usuario) => {
		  if (err) {
		    return res.status(412).json(err);
		  }
		  else{
		  	return res.json(usuario);
		  }

		});
  	};


	this.add = function(req, res){
		const novo = req.body;
		console.log(novo);
	    usuario.save(novo, 'usuario', (err, novoUsuario) => {
	      if (err) {
	        return res.status(412).json(err);
	      }
	      else{
	      	return res.json(novoUsuario);
	      }

	    });
  	};


	this.getByUsuarioId = function(req, res){
	    const { usuarioId } = req.params;
	    usuario.read(usuarioId, (err, usuario) => {
	      if (err) {
	        if (err.message === 'Invalid ID' ||
	            err.neo4jException === 'NodeNotFoundException') {
	        	console.log(err.message);
	        	console.log(usuarioId);
	        	console.log(req.params);
	          return res.status(404).end();
	        }
	        else{
	        	return res.status(412).json(err);
	        }

	      }
	      else
		      return res.json(usuario);
	    });
  	};

  	this.update = function(req, res){
	    const { usuarioId } = req.params;
	    const novo = req.body;
	    Object.assign(novo, { id: usuarioId });
	    usuario.save(novo, (saveErr, novoUsuario) => {
	      if (saveErr) {
	        return res.status(412).json(saveErr);
	      }
	      else
	      	return res.json(novoUsuario);
	    });
	  };

	this.delete = function(req, res){
    const { usuarioId } = req.params;
    usuario.delete(usuarioId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      else
      	return res.status(204).end();
    });
  };

  	return this;
};
