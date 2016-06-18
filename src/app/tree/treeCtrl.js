angular.module("Ident")
  .controller("Tree", function(COLFactory, InfoFactory, $scope, $uibModal, $location) {
    const tree = this;

    //runs on initial load of page to get the 'start' page starting taxa. Gets reassigned to a data object on new clicks.
    tree.currentTaxa = COLFactory.getCurrentTaxa(); 
  

    tree.loadSubtaxa = () => {

      if (tree.mySubtaxa) {
        //part of this redirect runs the GET request to the COLFactory.
        $location.path(`/tree/${tree.mySubtaxa}`);
      } else {
        console.log("nothing was selected");
      }//end of if tree.mySubtaxa
    };//end of loadSubtaxa



    //loads on "more info" button click to open modal and get subtaxa info. 
    tree.openModal = (scientificName) => {

      const modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled, 
        size: "lg",
        templateUrl: "app/modal/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (InfoFactory) {
            //TODO: run the card population in the background for faster modal load.
            return InfoFactory.populateTaxaCard(scientificName);
          }//end of data function
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal

  });//end of controller

  


