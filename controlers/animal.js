var expressJoi =require('express-joi');

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

    const apiStandard = {
    					"api" : "adota-eu",
						"versao" :"0.0.1"
    					};

	// Use the Joi object to create a few schemas for your routes. 
	this.schemaAnimalAdd ={
	    nome: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    raca: expressJoi.Joi.types.String().alphanum().min(1).max(20).required(),
	    idade: expressJoi.Joi.types.Number().required(),
	    descricao: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    especie: expressJoi.Joi.types.String().alphanum().min(1).max(20).required(),
	    doador: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    telefone: expressJoi.Joi.types.String().regex(/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{5}[-\s\.]{0,1}[0-9]{4}$/),
	    foto: expressJoi.Joi.types.String().regex(/\.(jpe?g|png)$/i)
	};

	this.schemaAnimalUpdate ={
	    animalId: expressJoi.Joi.types.Number(),
	    nome: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    raca: expressJoi.Joi.types.String().alphanum().min(1).max(20).required(),
	    idade: expressJoi.Joi.types.Number().required(),
	    descricao: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    especie: expressJoi.Joi.types.String().alphanum().min(1).max(20).required(),
	    doador: expressJoi.Joi.types.String().alphanum().min(1).max(50).required(),
	    telefone: expressJoi.Joi.types.String().regex(/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{5}[-\s\.]{0,1}[0-9]{4}$/),
	    foto: expressJoi.Joi.types.String().regex(/\.(jpe?g|png)$/i)
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

  	this.standard = function(req, res){
  		res.json(apiStandard);
  	}

	this.add = function(req, res){
		let novo = req.body;
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
	    let { animalId } = req.params;
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
	    let { animalId } = req.params;
	    let animalNovo = req.body;
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
    let { animalId } = req.params;
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
