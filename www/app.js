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
	.when("/download",{
		templateUrl: "views/download.html",
		controller: "downloadCtrl"
	})
	.when("/upload",{
		templateUrl: "views/upload.html",
		controller: "uploadCtrl"
	})
	.otherwise({
		templateUrl: "views/error.html"
	});

	$locationProvider.html5Mode(true);
}]);



