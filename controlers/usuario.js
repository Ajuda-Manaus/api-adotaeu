module.exports = function(app) {
	const usuario = app.models.usuario;

	this.getAll = function(req, res){
		usuario.find({}, (err, usuario) => {
		  if (err) {
		    return res.status(412).json(err);
		  }
		  else{
		  	return res.json(usuario);	
		  }
		  
		});
  	};

	this.add = function(req, res){
		const animal = req.body;
		console.log(animal);
	    usuario.save(animal, (err, novoAnimal) => {
	      if (err) {
	        return res.status(412).json(err);
	      }
	      else{
	      	return res.json(novoAnimal);	
	      }
	      
	    });
  	};


	this.getByUsuarioId = function(req, res){
	    const { animalId } = req.params;
	    usuario.read(animalId, (err, animal) => {
	      if (err) {
	        if (err.message === 'Invalid ID' ||
	            err.neo4jException === 'NodeNotFoundException') {
	          return res.status(404).end();
	        }
	        else{
	        	return res.status(412).json(err);	
	        }
	        
	      }
	      else
		      return res.json(animal);
	    });
  	};

  	this.update = function(req, res){
	    const { animalId } = req.params;
	    const animal = req.body;
	    Object.assign(animal, { id: animalId });
	    usuario.save(animal, (saveErr, novoAnimal) => {
	      if (saveErr) {
	        return res.status(412).json(saveErr);
	      }
	      else
	      	return res.json(novoAnimal);
	    });
	  };

	this.delete = function(req, res){
    const { animalId } = req.params;
    usuario.delete(animalId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      else
      	return res.status(204).end();
    });
  };

  	return this;
};