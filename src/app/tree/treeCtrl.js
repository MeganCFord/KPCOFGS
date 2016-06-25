angular.module("Ident")
  .controller("Tree", function(COLFactory, InfoFactory, FirebaseFactory, $scope, $uibModal, $location, $timeout) {
    const tree = this;

    $scope.notDisabled = function(item) {
      return (item.specialData && item.specialData.enableMe === true);
    };



    //gets assigned the entire subtaxa object.
    tree.selectedSubtaxa = null;
    
    //runs after page load.
    tree.loadcurrentTaxa = () => {
      $timeout().then(() => {tree.currentTaxa = COLFactory.getCurrentTaxa();
        console.log("current Taxa: ", tree.currentTaxa);
        return tree.currentTaxa;
      }).then(() => {
        $scope.$emit("settingCurrentRank", tree.currentTaxa.rank);
      });
    };
    tree.loadcurrentTaxa(); 

    //loads next page on submit button click.
    tree.traverse = () => {
      $timeout().then(()=>{
        FirebaseFactory.sendUserAnswer(tree.selectedSubtaxa.name, tree.selectedSubtaxa.specialData.question)
        .then(()=> {
          if (tree.currentTaxa.traversable===false){
            $location.path(`/species/${tree.selectedSubtaxa.name}`);
          } else {
            $location.path(`/tree/${tree.selectedSubtaxa.name}`);
          }
        });//end of .then
      });//end of $timeout
    };//end of tree.traverse



    //loads on "more info" button click to open modal and get subtaxa info. 
    tree.openModal = (scientificName) => {


      const modalInstance = $uibModal.open({
        size: "lg",
        templateUrl: "app/modal/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (InfoFactory) {
            return InfoFactory.populateTaxaCard(scientificName);
          }//end of data function
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal


    tree.goBackButton = () => {
      tree.selectedSubtaxa = null;
      FirebaseFactory.deleteLastAnswer(tree.currentTaxa.name)
      .then(()=> {
        $location.path(`/tree/${tree.currentTaxa.classification[tree.currentTaxa.classification.length - 1].name}`);
      });
    };

  })//end of controller

