app.controller("regCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
	$scope.error = '';

	$scope.regNewUser = function() {
		if($scope.username != null && $scope.username != '' && $scope.password != null && $scope.password != '' && $scope.repassword != null && $scope.repassword != '' && $scope.email != null && $scope.email != ''){
				if($scope.password === $scope.repassword){
					var title = 'User';
					$http({
						method: 'POST',
						url: '/user/newregistration',
						data: {username: $scope.username, password: $scope.password, email: $scope.email, title: title}
					}).then(function successCallback(res){
						console.log("success");
						
					}, function errorCallback(res){
						console.log("error");
					});
					return
			}else {
				$scope.error = "Both passwords must match!";
				return;
			}
		} else {
			$scope.error = "Wow, missing something maybe?";
			console.log("missing credentials in form");
		}
	}
}]);