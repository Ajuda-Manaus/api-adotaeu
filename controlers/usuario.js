import neo4j from 'neo4j';

// private constructor:
module.exports = function(app) {

var db = new neo4j.GraphDatabase("http://neo4j:root@localhost:7474");
const User = app.models.usuario;
// static methods:
User.get = function (id, callback) {
	var qp = {
		query: [
			'MATCH (user:User)',
			'WHERE ID(user) = {userId}',
			'RETURN user',
		].join('\n'),
		params: {
			userId: parseInt(id)
		}
	}

	db.cypher(qp, function (err, result) {
		if (err) return callback(err);
		callback(null, result[0]['user']);
	});
};

User.getBy = function (field, value, callback) {
	var qp = {
		query: [
			'MATCH (user:User)',
			'WHERE ' + field + ' = {value}',
			'RETURN user',
		].join('\n'),
		params: {
			value: value
		}
	}

	db.cypher(qp, function (err, result) {
		if (err) return callback(err);
		if (!result[0]) {
			callback(null, null);
		} else {
			callback(null, result[0]['user']);
		}
	});
}

User.create = function (data, callback) {
	var qp = {
		query: [
			'CREATE (user:User {data})',
			'RETURN user',
		].join('\n'),
		params: {
			data: data
		}
	}

	db.cypher(qp, function (err, results) {
		if (err) return callback(err);
		callback(null, results[0]['user']);
	});
};

User.update = function (data, callback) {
	var qp = {
		query: [
			'MATCH (user:User)',
			'WHERE id(user) = {userId}',
			'SET user += {props}',
			'RETURN user',
		].join('\n'),
		params: {
			userId: data.id,
			props: data.props,
		}
	}

	db.cypher(qp, function (err, results) {
		if (err) return callback(err);
		callback(null, results[0]['user']);
	});
}
}
