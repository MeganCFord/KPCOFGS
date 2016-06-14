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

  .controller("Identer", function($scope, COLFactory) {

    const identer = this;
    identer.currentTaxa = {};

    identer.title="Hello World";


    identer.sendTaxa = (nameToSend) => {
      console.log("name I'm sending", nameToSend );
      COLFactory.COLforTaxa(nameToSend).then((data) => {identer.currentTaxa = data; console.log("new identer taxa", identer.currentTaxa);});
    };
    //run this on start, perhaps as a resolve or something? 
    identer.sendTaxa("chordata");
  });

  
