module.exports = class Fs {

	constructor(express) {
		this.app = express;
		this.appRoot = g.settings.appRoot;
		this.settings = g.settings.Server;
		this.fs = m.fs;
		this.multer = m.multer;
		this.upload = m.upload;
		this.router();
		this.dataBase = new g.classes.Mongo();
		this.files = this.dataBase.getModel('Files');
	}
	router() {
		var me = this;

		this.app.post('/fs/uploadFile', me.upload.any(), (req, res) =>{
			res.json({status: 'working'});
		});

		this.app.post('/fs/uploadName', (req, res) =>{
			var length = req.body.fileName.length-1;
			req.body.fileName = req.body.fileName.slice(1, length);
			me.files.create(req.body, (err, data) => {
				if(err) {
					console.log(err.stack);
					res.json(err.stack);
				}
				res.json(data);
			})
		});

		this.app.get('/fs/showFiles', (req, res) => {
			var fileArray = [];
			var folder = me.appRoot + '/uploads';
			me.fs.readdir(folder, (err,files) => {
				if(err){ 
					throw err;
				} else {
					files.forEach(file => {
						var length = file.length-4;
						var finalFile = file.slice(0, length);
						//var fileUrl = '../../uploads/'+ finalFile;
						fileArray.push(finalFile);
					});
				}
			console.log(fileArray);
			var finalFiles = JSON.stringify(fileArray);
			res.json(finalFiles);
			});
		});

		this.app.get('/fs/getfilename', (req, res) => {
			var query = req.params.id ? 'findById' : 'find';
			var data = req.params.id ? req.params.id : {};
			me.files[query](data, (err, result) => {
				if(err) {
					res.json(err.stack);
				}
				res.json(result);
			});
		});

		this.app.delete('/fs/removefilename/:id?', (req, res) => {
			me.files.findByIdAndRemove(req.params.id, (err,data) => {
				if(err) {
					console.log(err.stack);
					res.json(err.stack);
				}
				res.json('Removed');
			})
		})
	}
}