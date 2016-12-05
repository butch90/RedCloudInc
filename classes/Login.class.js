var loginUrl = g.settings;

module.exports = class Login {
	constructor(express){
		this.app = express;
		this.settings = loginUrl.Login;
		this.mongo = new g.classes.Mongo();
		this.model = this.mongo.getModel('User');

		this.loginSetup()
	}

	loginSetup() {
    var me = this;
		
		this.app.all(this.settings.route, (req, res) =>{
			if(!me[req.method]) {
				res.sendStatus(404);
				res.end();
				return;
			}
      res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
			me[req.method](req, res);
		});
  }

	POST(req, res) {
  	console.log("POST");
  	var data = req.body || {};

  	if(!data.username || !data.password) {
  		res.sendStatus(400);
  		res.end();
  		return;
		}
  	this.model.findOne(data, (err, result) => {
  		if(!result){
  			console.log("error", err.stack);
  			res.json(true);
        return;
  		} 
  		req.session.isLoggedIn = result._id; 
  		req.session.xUsername = result.username;
  		req.sessionID = result._id.toString();
  		console.log("UserId:", result._id, "is logged in.");
  		console.log("current session id:", req.sessionID);
  		res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
  		res.json(true);
  		return;
  	})
	}

  GET(req, res) {
  	console.log("GET");
  	res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
  	res.json(!!req.session.isLoggedIn);
  }

  DELETE(req, res) {
  	console.log("DELETE");
  	delete req.session.isLoggedIn;

  	res.json(true);
  }
}