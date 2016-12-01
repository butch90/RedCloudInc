module.exports = class Server {

	constructor(Mongo){

		this.settings = g.settings.Server;

		this.appRoot = g.settings.appRoot;

		this.app = m.express();

		this.app.use(m.express.static(g.settings.appRoot + g.settings.Server.webRoot));

		this.multer = m.multer;

		this.upload = m.upload;
		
		this.fs = m.fs;

		this.setup();

	}

	setup(){
		var me = this;

		this.app.get('/', (req, res) => {

			res.sendFile(me.appRoot + me.settings.webRoot + '/index.html');

		});

		this.app.post('/uploadFile', me.upload.any(), (req, res) =>{
			res.json({status: 'working'});
		});

		/*this.app.get('/showFiles', (req, res) => {
			var fileArray = [];
			var folder = me.appRoot + '/uploads';
			me.fs.readdir(folder, (err,files) => {
				if(err){ 
					throw err;
				} else {
					files.forEach(file => {
						fileArray.push(file);
					});
				}
			console.log(fileArray);
			});
			res.json(fileArray);
		});*/

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
	    new g.classes.Fs(this.app);

		this.app.listen(me.settings.port, function(){

			var date = new Date();
			var time = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + ':' + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());

		  	console.log("Server started at port: " + me.settings.port + '\nTime: ' + time);
		});
	}
};