app.controller("homeCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
	$scope.login = function() {
		$location.path("/upload")
	}

	$scope.loginUser = function() {
		if($scope.username != null && $scope.username != '' && $scope.password != null && $scope.password != ''){
			$http({
				method: 'POST',
				url: '/api/login',
				data: {username: $scope.username, password: $scope.password}
			}).then(function successCallback(res){
				console.log("success");
				$location.path("/upload")
			}, function errorCallback(res){
				console.log("error");
			});
		} else {
			$scope.error = "Wow, missing something maybe?";
			console.log("missing credentials in form");
		}
	}
}]);