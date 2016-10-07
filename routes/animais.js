/**
* @api {get} /animais Request User information
* @apiName GetAnimais
* @apiGroup Animais
*
* @apiParam {Number} limit Número limite de animais solicitados.
* @apiParam {Number} skip Pega animais depois desse numero solicitado.

* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "id": "12345",
*       "name": "Dogão é mau",
*       "image" : "urldaimage.jpg"
*     }
*
*/
module.exports = (app) => {
	const animais = app.models.animais;

	app.get('/animais', (req, res) => {
		animais.find({}, (err, animais) => {
		  if (err) {
		    return res.status(412).json(err);
		  }
		  return res.json(animais);
		});
	});	

	app.post('/animais', (req, res) => {
    const animal = req.body;
    animais.save(animal, (err, novoAnimal) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(novoAnimal);
    });
  });

	app.get('/animais/:animalId', (req, res) => {
    const { animalId } = req.params;
    animais.read(animalId, (err, animal) => {
      if (err) {
        if (err.message === 'Invalid ID' ||
            err.neo4jException === 'NodeNotFoundException') {
          return res.status(404).end();
        }
        return res.status(412).json(err);
      }
      return res.json(animal);
    });
  });

	app.put('/animais/:animalId', (req, res) => {
    const { animalId } = req.params;
    const animal = req.body;
    Object.assign(animal, { id: animalId });
    animais.save(animal, (saveErr, novoAnimal) => {
      if (saveErr) {
        return res.status(412).json(saveErr);
      }
      return res.json(novoAnimal);
    });
  });

	app.delete('/animais/:animalId', (req, res) => {
    const { animalId } = req.params;
    animais.delete(animalId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });

};
  