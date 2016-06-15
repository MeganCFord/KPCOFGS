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
    identer.subTaxa = [];

    identer.title= identer.currentTaxa.name;

//gets the current taxa, then runs through all the subtaxa to get all their info. it does NOT get the vernacular info of the current taxa though. 
    identer.setUpPage = (nameToSend) => {
      identer.subTaxa = [];
      COLFactory.COLforTaxa(nameToSend)
      .then((data) => {identer.currentTaxa = data; console.log("current taxa data", identer.currentTaxa );})
      .then(() => {
        return Promise.all(identer.currentTaxa.child_taxa.map(function (taxa) {
          return COLFactory.EOLforID(taxa.name);
        }));
      }).then((subtaxaInfo) => {
        identer.subTaxa =subtaxaInfo;
        console.log("array of subtaxa info", subtaxaInfo );
      });//end of .then
    };//end of setUpPage
    //run this on start, perhaps as a resolve or something? 
    identer.setUpPage("Reptilia");
  });

  
