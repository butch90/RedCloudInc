app.directive('angularCarousel', [function() {

  return {
    templateUrl: '/directives/carousel.html',
    controller: ['$scope', '$route', function($scope, $route) {
      var $ = angular.element;

      function getSlideHeight() {
        return $(window).height() - parseInt($('body').css('marginTop'));
      }

      $scope.route = $route;
      $scope.myInterval = 3000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      var slides = $scope.slides = [],
          currIndex = 0;

      $scope.addSlide = function() {
          slides.push({
            imageStyle: {
              'background-image': 'url(public/pictures/slideone' + (currIndex+1) + '.png)',
              height: getSlideHeight(),
            },
            id: currIndex ++
          });         
      };

      $scope.$on('$destroy', function() {
        $(window).off('resize', resizer);
      });

        for (var i = 0; i < 2; ++i) {
          $scope.addSlide();

        }
      
    }]
  };
}]);


