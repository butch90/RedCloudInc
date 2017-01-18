module.exports = class Order {

	constructor(express) {
		this.app = express;
		this.dataBase  = new g.classes.Mongo();
		this.user = this.dataBase.getModel('User');
		this.mongodb = m.mongodb.ObjectId;
		var me = this;
		this.router();
	}
	router() {
		var me = this;

		this.app.get('/user/getuserloggedinid', (req, res) => {
			/*SPARA SOM OBJ SÅ JAG KAN HÄMTA FRÅN OBJ*/
			console.log(req.sessionID, "sessionID");	
			res.json(true);	
		});

		this.app.get('/user/getuserprofiledata', (req, res) => {
			var userObject = {};
			me.user.find({"_id": me.mongodb(req.sessionID)}, (err, result) => {
				userObject = result;
				//delete userObject[0, "password"];
				console.log(userObject, "result");
			});
			res.json(true);
		});

	}
	/*
	POST(req, res) {
		var me = this;
		this.user.create(req.body, function(err, data) {
			if(err) {
				//console.log(err);
				res.json(err);
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
				res.json(err);
			}

			//console.log(result);
			res.json(result);
		});
	}

	PUT(req, res) {
		this.user.findByIdAndUpdate(req.params.id ,req.body, function(err, data) {
			if(err) {
				res.json(err);
				//console.log(err);
			}
			res.json(data);
		});
	}

	DELETE(req, res) {
		this.user.findByIdAndRemove(req.params.id, function(err, data) {
			if(err) {
				res.json(err);
				console.log(err);
			}
			res.json('Removed');
		});
	}


*/
}