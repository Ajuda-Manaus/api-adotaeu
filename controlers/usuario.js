module.exports = function(app) {
	const usuario = app.models.usuario;

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