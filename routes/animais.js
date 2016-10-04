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
};
  