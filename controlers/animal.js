module.exports = function(app) {
	const animal = app.models.animal;
	const erroAnimal = {
                		"api" : "adota-eu",
                		"error": {
                        "number": "01",
                     	"status":"404",
                     	"description":"This animal is not found"
                        		 }
           				};

	this.findAll = function(req, res){
		animal.find({}, 'animal', (err, animal) => {
		  if (err) {
		    return res.status(412).json(err);
		  }
		  else{
		  	return res.json(animal);	
		  }
		  
		});
  	};

	this.add = function(req, res){
		const novo = req.body;
		console.log(novo);
	    animal.save(novo, 'animal', (err, novoAnimal) => {
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
	    animal.read(animalId, (err, animal) => {
	      if (err) {
	        if (err.message === 'Invalid ID' ||
	            err.neo4jException === 'NodeNotFoundException') {
	          return res.status(404).json(erroAnimal);
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
	    const animalNovo = req.body;
	    Object.assign(animalNovo, { id: animalId });
	    animal.save(animalNovo, (saveErr, novoAnimal) => {
	      if (saveErr) {
	        return res.status(404).json(erroAnimal);
	      }
	      else
	      	return res.json(novoAnimal);
	    });
	  };

	this.delete = function(req, res){
    const { animalId } = req.params;
    animal.delete(animalId, (err) => {
      if (err) {
        return res.status(404).json(erroAnimal);
      }
      else
      	return res.status(204).end();
    });
  };



  	return this;
};