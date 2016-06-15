angular.module("Ident", ["ngRoute", "ui.bootstrap"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        templateUrl: "app/identer.html",
        controller: "Identer", 
        controllerAs: "identer"
      })
      .otherwise("/");
  })

  .controller("Identer", function(COLFactory, $scope, $sce, $timeout) {
    const identer = this;

    
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

//gets the current taxa with scientific names only of child taxa. add'l info loads on a click. 
    identer.setUpPage = (nameToSend) => {
      identer.subTaxa = [];
      COLFactory.COLforTaxa(nameToSend)
      
      .then((data) => {
        identer.currentTaxa = data; 
        console.log("current taxa data", identer.currentTaxa );
      });
    };//end of setUpPage


    identer.populateTaxaCard = (scientificName) => {
      COLFactory.populateTaxaCard(scientificName)
      .then((info) => {
        identer.modalInfo = info;
        console.log("identer modal info", identer.modalInfo );
      });
    };

    //run this on start, perhaps as a resolve or something? 
    identer.setUpPage("Reptilia");
  });

  
