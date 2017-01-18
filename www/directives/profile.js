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
			url: '/user/getuserprofiledata'
		}).then(function successCallback (data){
			console.log("success");

		}, function errorCallback (){
			console.log("error");
		})
	}
	/*Borde flyttas så att den kan köras med inloggningen, så jag kan nå sessionID hela tiden från inloggningen sker*/
	$scope.getUserData = () => {
		$http({
			method: 'GET',
			url: '/user/getuserloggedinid'
		}).then(function successCallback(res){
			console.log("success");
		},function errorCallback(res){
			console.log("error");
		});
	}
}])
