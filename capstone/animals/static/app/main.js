angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/tree/:taxa", {
        templateUrl: "../../static/app/background/background.html",
        controller: "Background", 
        controllerAs: "background", 
        resolve: {
          currentTaxa: function(TreeFactory, $route) {
            return TreeFactory.loadTree($route.current.params.taxa);
          } 
        }
      })
      .when("/species/:taxa", {
        templateUrl:"../../static/app/background/background.html", 
        controller: "Background", 
        controllerAs: "background",
        resolve: {
          currentTaxa: function(TreeFactory, $route) {
            return TreeFactory.loadTree($route.current.params.taxa);
          } 
        }
      })
      .when("/", {
        templateUrl: "../../static/app/background/background.html", 
        controller: "Background", 
        controllerAs: "background"
      })
      .otherwise("/");
  });


 
