m = {
    fs: require('fs'),
    path: require('path'),
};
g = {};

for(key in require('./package.json').dependencies){
    m[key.replace(/\W/g,'')] = require(key);
}

var appRoot = m.path.normalize(__dirname +'/');

g.settings = {
  appRoot: appRoot,
  modelDir: m.path.join(appRoot, 'schemas/'),
  Server: {
    port: 3000,
    endpoint: '*',
    webRoot: 'www'
  },
  classes: [
    'Mongo',
    'Server',
    'Login',
    'Users',
    'Fs',
  ],
  Login: {
    route: '/api/login/:id?'
  },
  User: {
    route: '/api/user/:id?'
  }
};

var options = m.multer.diskStorage({
  destination: g.settings.appRoot + '/uploads',
  filename: function (req, file, cb) {
    cb(null, (m.path.basename(file.originalname) + m.path.extname(file.originalname)));
  }
})
var upload = m.multer({storage: options});

m.upload = upload;

g.classes = {};
g.settings.classes.forEach((x)=>{
    g.classes[x] = require(m.path.join(g.settings.appRoot + 'classes/' + x + '.class.js'));
});

// Start server
new g.classes.Server();