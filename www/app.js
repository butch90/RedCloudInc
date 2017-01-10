var app = angular.module("redCloud", [
  'ngRoute',
  'ngResource',
  'ngTouch',
  'ui.bootstrap'
]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider){

	$routeProvider
	.when("/",{
		templateUrl: "views/home.html",
		controller: "homeCtrl"
	})
	.when("/login",{
		templateUrl: "views/login.html",
		controller: "loginCtrl"
	})
	.when("/download",{
		templateUrl: "views/download.html",
		controller: "downloadCtrl"
	})
	.when("/upload",{
		templateUrl: "views/upload.html",
		controller: "uploaderCtrl"
	})
	.when("/profile",{
		templateUrl: "views/profile.html",
		controller: "profileCtrl"
	})
	.otherwise({
		templateUrl: "views/home.html"
	});

	$locationProvider.html5Mode(true);
}]);



