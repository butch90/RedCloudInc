app.directive('showFiles', function (){
	return {
		templateUrl: 'directives/filedownload.html'
	}
})

app.controller('filedownloadCtrl', ['$scope', '$http', '$location', ($scope, $http, $location) => {
	$scope.showFiles = () => {
		$http({
			method: 'GET',
			url: '/fs/getfilename'
		}).then(function successCallback (data){
			var newNameArray = [];
			console.log(data.data);
			var nameArray = data.data;
			nameArray.forEach(name => {
				newNameArray.push(name.fileName);
			});
			$scope.items = newNameArray;
			console.log(newNameArray);
		}, function errorCallback (data){
			console.log('error on retriving filename');
		})
		/*$http({
			method: 'GET',
			url: '/fs/showFiles'
		}).then(function successCallback (data, status, headers, config){
			console.log('files retrived');
			var myArray = data.data;
			var obj = myArray.split(",");
			Object.assign({}, obj);
			//console.log(obj);
			//$scope.Items = obj;
			//console.log(obj);
		}, function errorCallback (data, status, headers, config){
			console.log('error on retriving files');
		});*/
	}

	/*if($location.path() == '/download') {
		$http({
			method: 'GET',
			url: '/fs/getfilename'
		}).then(function successCallback (data){
			console.log(data.data);
			var nameArray = data.data;
			$scope.items = nameArray;
		}, function errorCallback (data){
			console.log('error on retriving filename');
		})
	}*/
}])

