angular.module("Ident", ["ngRoute"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        templateUrl: "app/identer.html",
        controller: "Identer", 
        controllerAs: "identer"
      })
      .otherwise("/");
  })

  .controller("Identer", function($scope) {

    const identer = this;

    $scope.title="hello world (angular)";

  });
