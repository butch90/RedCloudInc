app.controller('navbarCtrl', ['$scope', '$location', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]).directive('navbar', [function(){
	
	return {
		templateUrl: 'directives/navbar.html'
	}
}]);