angular.module("Ident")
  .controller("Tree", function(COLFactory, InfoFactory, FirebaseFactory, $scope, $uibModal, $location, $timeout) {
    const tree = this;
    //this is just the name at this point. 
    tree.mySubtaxa = null;
    
    //with redirect, this loads each time the submit button is clicked.
    tree.loadcurrentTaxa = () => {
      $timeout().then(() => {tree.currentTaxa = COLFactory.getCurrentTaxa();
      console.log("tree.currentTaxa", tree.currentTaxa);
      });
    };
    tree.loadcurrentTaxa(); 


    tree.loadSubtaxa = () => {

      if (tree.mySubtaxa) {
        if (tree.currentTaxa.traversable===false){
          $location.path(`/species/${tree.mySubtaxa}`);
        } else {
          $location.path(`/tree/${tree.mySubtaxa}`);
        }
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

  


