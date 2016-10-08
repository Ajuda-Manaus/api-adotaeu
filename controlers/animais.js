module.exports = function(app) {
	const animais = app.models.animais;

	this.findAll = function(req, res){
		animais.find({}, (err, animais) => {
		  if (err) {
		    return res.status(412).json(err);
		  }
		  else{
		  	return res.json(animais);	
		  }
		  
		});
  	};

	this.add = function(req, res){
		const animal = req.body;
		console.log(animal);
	    animais.save(animal, (err, novoAnimal) => {
	      if (err) {
	        return res.status(412).json(err);
	      }
	      else{
	      	return res.json(novoAnimal);	
	      }
	      
	    });
  	};


	this.findByAnimalId = function(req, res){
	    const { animalId } = req.params;
	    animais.read(animalId, (err, animal) => {
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
	    animais.save(animal, (saveErr, novoAnimal) => {
	      if (saveErr) {
	        return res.status(412).json(saveErr);
	      }
	      else
	      	return res.json(novoAnimal);
	    });
	  };

	this.delete = function(req, res){
    const { animalId } = req.params;
    animais.delete(animalId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      else
      	return res.status(204).end();
    });
  };

  	return this;
};