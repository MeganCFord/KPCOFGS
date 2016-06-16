angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        templateUrl: "app/tree.html",
        controller: "Tree", 
        controllerAs: "tree"
      })
      .otherwise("/");
  })





  ////////////////CONTROLLER
  
  .controller("Tree", function(COLFactory, $scope, $uibModal ) {
    const tree = this;

      
    tree.loadSubtaxa = (aScientificName) => {
      //clear subtaxa.
      tree.subTaxa = [];
      COLFactory.COLforTaxa(aScientificName)
      
      .then((data) => {
        tree.currentTaxa = data; 
        console.log("current taxa data", tree.currentTaxa );
      });//end of .then
    };//end of loadSubtaxa



    //loads on "more info" button click to open modal and get subtaxa info. 
    tree.openModal = (scientificName) => {
 
      const modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled, 
        size: "lg",
        templateUrl: "app/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (COLFactory) {
            //TODO: replace this with a wikipedia search.
            //TODO: run the card population in the background for faster modal load.
            return COLFactory.populateTaxaCard(scientificName);
          }//end of data function
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal


    //TODO: replace this with a 'start' page to load up an initial tree. 
    tree.loadSubtaxa("Chordata");
  });//end of controller

  


