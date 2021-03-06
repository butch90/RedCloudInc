app.directive('fileUpload', function (){
	return {
		templateUrl: 'directives/fileupload.html'
	}
});

app.directive('fileModel', ['$parse', function ($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

m = {};

app.service('fileUpload', ['$http', function ($http){
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd = new FormData();
		fd.append('file', file);
		var name = JSON.stringify(fd.get('file').name);
		/*	JSON.stringify(name).split(".").pop();*/
		var dataName = {fileName: name};
		console.log(dataName);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-type': undefined}
		})
		.success(function (res){
			console.log(res.status);
			m.newFileName = name;
			console.log(m.newFileName);
			console.log(dataName);
			$http({
				method: 'POST',
				url: '/fs/uploadName',
				data: dataName,
				headers: {'Content-type': 'application/json'}
			})
			.success(function (res){
				console.log(res, 'res');
			})
			.error(function (){
				console.log('error at uploading filename');
			})
		})
	}
}]);
//console.log(m.newFileName, 'outside log');
app.controller('uploadCtrl', ['$scope', '$http', 'fileUpload', function ($scope, $http, fileUpload){
	$scope.uploadFile = function(){
		var data = $scope.myFile;
		var uploadUrl = '/fs/uploadFile';
		fileUpload.uploadFileToUrl(data, uploadUrl);
		/*var name = m;*/
		//var newName = JSON.stringify(name);
		var name = "File uploaded";
		$scope.name = name;
		console.log(name);
	};
}])

