module.exports = class Registration {

	constructor(express) {
		this.app = express;
		this.appRoot = g.settings.appRoot;
		this.fileRoot = g.settings.fileRoot;
		this.settings = g.settings.Server;
		this.dataBase  = new g.classes.Mongo();
		this.user = this.dataBase.getModel('Registration');

		this.router();
	}
	router() {
		var me = this;

		this.app.post('/reg/newregistration', (req, res) =>{
			me.files.create(req.body, (err, data) => {
				if(err) {
					console.log(err);
					res.json(err);
				}
				res.json(data);
			})
		});
	}		
}

