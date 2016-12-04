module.exports = class Fs {

	constructor(express) {
		this.app = express;
		this.appRoot = g.settings.appRoot;
		this.settings = g.settings.Server;
		this.fs = m.fs;
		this.router();
	}
	router() {
		var me = this;

		this.app.get('/fs/showFiles', (req, res) => {
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
			var finalFiles = JSON.stringify(fileArray);
			res.json(finalFiles);
			});
		});
	}
}