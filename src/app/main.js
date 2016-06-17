angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/tree", {
        templateUrl: "app/tree/tree.html",
        controller: "Tree", 
        controllerAs: "tree"
      })
      .when("/", {
        templateUrl: "app/start.html", 
        controller: "Start", 
        controllerAs: "start"
      })
      .otherwise("/");
  });


