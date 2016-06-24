angular.module("Ident")
  .controller("Background", function($scope, $route) {
    $scope.location=$route.current.$$route.originalPath;

    //this function sets a boolean value based on the route (location didn't work since I needed the pre-params path) to set which view shows in the background divs. 
    if ($scope.location === "/tree/:taxa") {
      $scope.tree = true;
    } else if ($scope.location === "/species/:taxa") {
      $scope.end = true;
    }else if ($scope.location === "/start") {
      $scope.start=true;
    }

  });
