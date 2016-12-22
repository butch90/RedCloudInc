app.directive('showFiles', function (){
	return {
		templateUrl: 'directives/filedownload.html'
	}
})

app.controller('filedownloadCtrl', ['$scope', '$http', '$location', '$attrs', ($scope, $http, $location, $attrs) => {
	var data;

	$scope.showFiles = () => {
		$http({
			method: 'GET',
			url: '/fs/getfilename'
		}).then(function successCallback (data){
			var newNameArray = [];
			var newIdArray = [];

			//console.log(data.data);

			var nameArray = data.data;
			nameArray.forEach(name => {
				newNameArray.push(name.fileName);
			});
			
			var idArray = data.data;
			idArray.forEach(id => {
				newIdArray.push(id._id);
			});

			$scope.repeatData = newNameArray.map((value, index) => {
				return {
					data: value,
					value: newIdArray[index]
				}
			});
			/*console.log(newIdArray);
			console.log(newNameArray);*/
		}, function errorCallback (data){
			console.log('error on retriving filename');
		})
	}

	$scope.hoverOver = () => {
		$scope.hoverChange = true;
	}

	$scope.hoverOut = () => {
		$scope.hoverChange = false;
	}

	$scope.deleteFile = () => {
	var id;
	$scope.data.value = id;
		console.log(id);
		/*$scope.data = data;
		$http({
			method: 'DELETE',
			url: '/fs/removefilename/' + data
		}).then(function successCallback (){
			console.log("deleted");
			$scope.message = "File deleted";
		}, function errorCallback (){
			console.log("not deleted");
			$scope.message = "Error on file deletion"
		}*/
	/*)*/}

}])
		/*$http({
			method: 'GET',
			url: '/fs/showFiles'
		}).then(function successCallback (data, status, headers, config){
			console.log('files retrived');
			var myArray = data.data;
			var obj = myArray.split(",");
			Object.assign({}, obj);
			//console.log(obj);
			$scope.Items = obj;
			//console.log(obj);
		}, function errorCallback (data, status, headers, config){
			console.log('error on retriving files');
		});*/
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
