module.exports = class Server {

	constructor(Mongo){

		this.settings = g.settings.Server;

		this.app = m.express();

		this.app.use(m.express.static(g.settings.appRoot + this.settings.webRoot));

		this.setup();
	}

	setup(){
		var me = this;

		this.app.get('*', function(req, res){

			res.sendFile(g.appRoot + g.webRoot + '/index.html');
		});

		this.app.use(m.bodyparser.json());
		this.app.use(m.compression());
		this.app.use(m.cookieparser());
		this.app.use(m.bodyparser.urlencoded({extended: false}));
		this.app.use(m.compression({threshold: 0}));
		this.app.use(m.expresssession({
			genid: function(req) {
				if (typeof req.sessionID != 'undefined') return req.sessionID;
			},
			secret: 'redcloud',
			resave: false,
			saveUninitialized: true
	    }));

		// Mongoose classes
		new g.classes.Users(this.app);
	    new g.classes.Login(this.app);
	    new g.classes.Mongo(this.app);

		this.app.listen(me.settings.port, function(){

			var date = new Date();
			var time = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + ':' + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());

		  	console.log("Server started at port: " + me.settings.port + '\nTime: ' + time);
		});
	}
};