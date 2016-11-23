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
    /*'REST',*/
  ],
  Login: {
    route: '/api/login/:id?'
  },
  User: {
    // define vehicles param to get at list of orders(vehicles) the employee has
    route: '/api/user/:id?'
  },
 /* REST: {
    route: '/rest/:model/:id?',
    routeSql: '/sql/api/:model/:id?'
  },*/
};

g.classes = {};
g.settings.classes.forEach((x)=>{
    g.classes[x] = require(m.path.join(g.settings.appRoot + 'classes/' + x + '.class.js'));
});

// Start server
new g.classes.Server();