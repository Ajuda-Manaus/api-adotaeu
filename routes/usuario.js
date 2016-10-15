var expressJoi =require('express-joi');

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
	const usuario = app.controlers.usuario;

	app.get('/usuario', usuario.getAll);

	app.get('/usuario/:usuarioId', usuario.getByUsuarioId);

	app.post('/usuario', expressJoi.joiValidate(usuario.schemaUsuario), usuario.add);

	app.put('/usuario/:usuarioId', usuario.update);

	app.delete('/usuario/:usuarioId', usuario.delete);
/**/
};
  