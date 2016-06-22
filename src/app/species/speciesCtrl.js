angular.module("Ident")
  .controller("Species", function($timeout, FirebaseFactory, COLFactory, $scope, $sce, $location) {
    const species = this;

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };


    species.loadcurrentTaxa = () => {
      $timeout().then(() => {species.currentTaxa = COLFactory.getCurrentTaxa();
      console.log("species.currentTaxa", species.currentTaxa);
      });
    };
    species.loadcurrentTaxa();


    species.goBackButton = () => {
      FirebaseFactory.deleteLastAnswer(species.currentTaxa.name)
      .then(() => {
        $location.path(`/tree/${species.currentTaxa.classification[species.currentTaxa.classification.length-1].name}`);
      });
    };

    species.publishAnimal = (name) => {
      FirebaseFactory.publishAnimal(name)
      .then(() => {
        $location.path("/");
      });
    };

  });
