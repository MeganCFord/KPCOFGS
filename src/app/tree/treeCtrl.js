angular.module("Ident")
  .controller("Tree", function(TreeFactory, InfoFactory, $scope, $rootScope, $uibModal, $location, $timeout) {
    const tree = this;

    tree.primary = true;
    //filter for my firebase data questions.
    $scope.notDisabled = function(item) {
      if (tree.primary === true) {
        return (item.specialData && item.specialData.enableMe === true);
      } else {
        return (item.specialData && item.specialData.enableMe === false);
      }
    };

    //gets assigned the entire subtaxa object.
    tree.selectedSubtaxa = null;
    
    //runs after page load.
    tree.loadcurrentTaxa = () => {
      $timeout().then(() => {tree.currentTaxa = TreeFactory.getLoadedCurrentTaxa();
        console.log("current Taxa: ", tree.currentTaxa);
        return tree.currentTaxa;
      }).then(() => {
        //emits to parent scope for navbar coloration.
        $scope.$emit("settingCurrentRank", tree.currentTaxa.rank);
      });
    };
    tree.loadcurrentTaxa(); 

    //loads next page on submit button click.
    tree.traverse = () => { 
      $timeout()
        .then(()=> {
          if (tree.selectedSubtaxa.rank==="Family"){
            $location.path(`/species/${tree.selectedSubtaxa.name}`);
          } else {
            $location.path(`/tree/${tree.selectedSubtaxa.name}`);
          }
        });//end of .then
    };//end of tree.traverse



    //grabs the data from the modal "select this taxa" button. YAY.
    $rootScope.$on("modalPickedTaxa", function(event, value) { 
      tree.currentTaxa.child_taxa.forEach(function(child) {
        if (child.name === value) {
          tree.selectedSubtaxa = child;
        }
      });
    });

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
      $location.path(`/tree/${tree.currentTaxa.classification[tree.currentTaxa.classification.length - 1].name}`);
      // });
    };

  });//end of controller

