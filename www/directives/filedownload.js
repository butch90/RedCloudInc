app.directive('showFiles', function (){
	return {
		templateUrl: 'directives/filedownload.html'
	}
})

app.controller('filedownloadCtrl', ['$scope', '$http', '$location', ($scope, $http, $location) => {
	$scope.showFiles = () => {
		$http({
			method: 'GET',
			url: '/fs/showFiles'
		}).then(function successCallback(res){
			console.log('files retrived');
		}, function errorCallback(res){
			console.log('error on retriving files');
		});
	}
}])


