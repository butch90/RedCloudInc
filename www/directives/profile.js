app.directive('proFile', function (){
	return {
		templateUrl: 'directives/profile.html'
	}
})
app.controller('profilCtrl', ['$scope', '$http', '$location', '$attrs', ($scope, $http, $location, $attrs) => {
	$scope.img;
	if(!$scope.img) {
		$scope.img = 'public/pictures/defaultimage.png';
	}

	$scope.profileInfo = () => {
		$http({
			method: 'GET',
			url: '/api/user'
		}).then(function successCallback (data){
			console.log(data);

		}, function errorCallback (){
			console.log("error");
		})
	}
}])
