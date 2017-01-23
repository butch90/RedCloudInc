app.directive('proFile', function (){
	return {
		templateUrl: 'directives/profile.html'
	}
})
app.controller('profilCtrl', ['$scope', '$http', '$location', '$attrs', ($scope, $http, $location, $attrs) => {

	var profileimg = $scope.img,
			username,
			firstname,
			lastname,
			title,
			email,
			dataPlaceholder = [];

	if($location.path() === '/profile'){
			profileInfo();
			console.log("see me")
	}

	if(!profileimg) {
		$scope.img = 'public/pictures/defaultimage.png';
	}

	function profileInfo (){
		$http({
			method: 'GET',
			url: '/user/getuserprofiledata'
		}).then(function successCallback (res){
			//console.log("success");
			//console.log(res.data, "res");
			dataPlaceholder = '';
			dataPlaceholder = res.data;
			console.log(dataPlaceholder);
			profileScopes();
		}, function errorCallback (res){
			console.log("error");
		})
	}

	function profileScopes () {
		username = dataPlaceholder[0].username;
		firstname = dataPlaceholder[0].firstname;
		lastname = dataPlaceholder[0].lastname;
		title = dataPlaceholder[0].title;
		email = dataPlaceholder[0].email;
		$scope.username = username;
		$scope.firstname = firstname;
		$scope.lastname = lastname;
		$scope.title = title;
		$scope.email = email;
	}

	function uploadUserProfileData () {
		$http({
			method: 'PUT',
			url: '/user/changedata/:id?',
			data: {img: img, username: username, lastname: lastname, firstname: firstname, }
		})
	}
	/*Borde flyttas så att den kan köras med inloggningen, så jag kan nå sessionID hela tiden från inloggningen sker*/
	/*$scope.getUserData = () => {
		$http({
			method: 'GET',
			url: '/user/getuserloggedinid'
		}).then(function successCallback(res){
			console.log("success");
		},function errorCallback(res){
			console.log("error");
		});
	}	*/

}])
