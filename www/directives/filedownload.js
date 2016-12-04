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
		}).then(function successCallback(data, status, headers, config){
			console.log('files retrived');
			var myArray = data.data;
			var obj = myArray.split(",");
			/*var newObj = obj.replace(/[/g, '');*/
			Object.assign({}, obj);
			//console.log(obj);
			$scope.Items = obj;
			console.log(obj);
		}, function errorCallback(data, status, headers, config){
			console.log('error on retriving files');
		});
	}
}])