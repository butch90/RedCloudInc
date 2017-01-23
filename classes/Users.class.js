module.exports = class Order {

	constructor(express) {
		this.app = express;
		this.settings = g.settings.Server;
		this.dataBase  = new g.classes.Mongo();
		this.user = this.dataBase.getModel('User');
		this.mongodb = m.mongodb.ObjectId;
		var me = this;
		this.router();
	}
	router() {
		var me = this;
		var userObject = {};
		var dataToFrontend = [];

		this.app.get('/user/getuserprofiledata', (req, res) => {
			me.user.find({"_id": me.mongodb(req.sessionID)}, (err, result) => {
				if(err) res.send(err);
				userObject.username = result[0].username;
				userObject.firstname = result[0].firstname;  
				userObject.lastname = result[0].lastname;  
				userObject.email = result[0].email;  
				userObject.title = result[0].title;
				if(dataToFrontend < 1){
					dataToFrontend.push(userObject);
					res.json(dataToFrontend);
				} else {
					res.json(dataToFrontend);
				}
			});	
				//console.log(dataToFrontend)
		});

		this.app.get('/user/checkusers', (req, res) => {
			me.user.find({}, (err, data) => {
				console.log(data, "do you see me?");
				res.json(data);
			})
		});

		this.app.post('/user/newregistration', (req, res) =>{
			console.log(req.body);
			me.user.create(req.body, (err, data) => {
				if(err) {
					console.log(err.stack);
					res.json(err);
				}
				console.log(data);
				res.json(data);
			})
		});

		this.app.put('/user/changedata/:id?', (req, res) => {
			var id = req.params.id;
			me.user.findByIdAndUpdate(id, req.body, (err, data) => {
				console.log(data);
				res.json(data);
			})
		})

		/*this.app.get('/user/test', (req, res) => {
			console.log(dataToFrontend);
			//res.json(true);
		})*/
			

	}
}