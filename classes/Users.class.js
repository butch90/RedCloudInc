module.exports = class Order {

	constructor(express) {
		this.app = express;
		this.dataBase  = new g.classes.Mongo();
		this.user = this.dataBase.getModel('User');

		var me = this;
		this.router();
	}
	router() {
		var me = this;
		this.app.all(g.settings.User.route, function(req, res) {
			if (!me[req.method]) {
				res.sendStatus(404);
				return;
			}
			res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
			me[req.method](req, res);
		});
	}
	
	POST(req, res) {
		var me = this;
		this.user.create(req.body, function(err, data) {
			if(err) {
				console.log(err.stack);
				res.json(err.stack);
			}
			res.json(data);
		});
	}

	GET(req, res) {
		var me = this;
		var query = req.params.id ? 'findById' : 'find';
		var data = req.params.id ? req.params.id : {};

		var me = this;
		this.user[query](data, function(err, result) {
			if(err) {
				res.json(err.stack);
			}
			res.json(result)
		});
	}

	PUT(req, res) {
		this.user.findByIdAndUpdate(req.params.id ,req.body, function(err, data) {
			if(err) {
				res.json(err.stack);
				console.log(err.stack);
			}
			res.json(data);
		});
	}

	DELETE(req, res) {
		this.user.findByIdAndRemove(req.params.id, function(err, data) {
			if(err) {
				res.json(err.stack);
				console.log(err.stack);
			}
			res.json('Removed');
		});
	}
}