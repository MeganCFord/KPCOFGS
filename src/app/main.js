angular.module("Ident", ["ngRoute", "ui.bootstrap", "ngAnimate"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        templateUrl: "app/identer.html",
        controller: "Identer", 
        controllerAs: "identer"
      })
      .otherwise("/");
  })

  .controller("Identer", function(COLFactory, $scope, $uibModal ) {
    const identer = this;

    

    // $scope.animationsEnabled = true;

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
        console.log("identer modal info", info );
        return info;
      });
    };

    //loads on click to open modal and get the subtaxa info. 
    identer.openModal = (scientificName) => {

      
      const modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled, 
        size: "lg",
        templateUrl: "app/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (COLFactory) {
            return COLFactory.populateTaxaCard(scientificName);
          }//end of data function
        }//end of resolve
            
      });//end of modal.open
    }; //end of identer.openModal

    //run this on start, perhaps as a resolve or something? 
    identer.setUpPage("Reptilia");
  })//end of controller

  

.controller("modalController", function($scope, $uibModalInstance, data, $sce) {
  const modalController = this;
  
  modalController.data= data;
  console.log("data", data );

  //runs to make any HTML description text show correctly. 
  $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

  $scope.active = 0;

  modalController.ok = function (nameToSend) {
    $uibModalInstance.close();
    
  };

  modalController.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
