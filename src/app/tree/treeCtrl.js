angular.module("Ident")
  .controller("Tree", function(COLFactory, InfoFactory, $scope, $uibModal ) {
    const tree = this;

    //runs on initial load of page to get the 'start' page starting taxa. Gets reassigned to a data object on new clicks.
    tree.currentTaxa = COLFactory.getCurrentTaxa(); 
  

    tree.loadSubtaxa = () => {
      //clear subtaxa display array.
      tree.subTaxa = [];

      if (tree.mySubtaxa) {
        COLFactory.COLforTaxa(tree.mySubtaxa)
        .then((data) => {
          tree.currentTaxa = data; 
          console.log("current taxa data", tree.currentTaxa );
        });//end of .then
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

  


