angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/tree/:taxa", {
        templateUrl: "app/background/backgroundframework.html",
        controller: "Background", 
        controllerAs: "background", 
        resolve:  {
          currentTaxa: function(COLFactory, $route) {
            console.log("current route", $route.current.params.taxa );
            return COLFactory.COLforTaxa($route.current.params.taxa);
          }, 
          currentUserObject: function(FirebaseFactory) {
            return FirebaseFactory.getUserObject();
          }
        }
      })
      .when("/species/:taxa", {
        templateUrl:"app/background/backgroundframework.html", 
        controller: "Background", 
        controllerAs: "background", 
        resolve: {
          currentTaxa: function(COLFactory, $route) {
            return COLFactory.COLforTaxa($route.current.params.taxa);
          }, 
          currentUserObject: function(FirebaseFactory) {
            return FirebaseFactory.getUserObject();
          }
        }
      })
      .when("/start", {
        templateUrl: "app/background/backgroundframework.html", 
        controller: "Background", 
        controllerAs: "background", 
        resolve: {
          clearedUserObject: function(FirebaseFactory) {
            return FirebaseFactory.clearUserObject();
          }, 
          feed: function(FeedFactory) {
            return FeedFactory.getPublishedAnimals();
          }
        }
      })
      .otherwise("/start");
  });


