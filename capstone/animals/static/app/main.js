angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/tree/:taxa", {
        templateUrl: "../../static/app/background/background.html",
        controller: "Background", 
        controllerAs: "background"
      })
      .when("/species/:taxa", {
        templateUrl:"../../static/app/background/background.html", 
        controller: "Background", 
        controllerAs: "background"
      })
      .when("/", {
        templateUrl: "../../static/app/background/background.html", 
        controller: "Background", 
        controllerAs: "background"
      })
      .otherwise("/");
  });


 
