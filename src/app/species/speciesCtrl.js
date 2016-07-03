angular.module("Ident")
  .controller("Species", function($timeout, UserObjectFactory, FeedFactory, TreeFactory, $scope, $sce, $location) {
    const species = this;

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };


    species.loadcurrentTaxa = () => {
      $timeout().then(() => {species.currentTaxa = TreeFactory.getCurrentTaxa();
        console.log("species.currentTaxa", species.currentTaxa);
        return species.currentTaxa;
      }).then(() => {
        //emits to parent scope for navbar coloration.
        $scope.$emit("settingCurrentRank", species.currentTaxa.rank);
      });
    };
    species.loadcurrentTaxa();


    species.goBackButton = () => {
      UserObjectFactory.deleteLastAnswer(species.currentTaxa.name)
      .then(() => {
        $location.path(`/tree/${species.currentTaxa.classification[species.currentTaxa.classification.length-1].name}`);
      });
    };

    species.publishAnimal = (nameToAdd) => {
      FeedFactory.publishAnimal(nameToAdd)
      .then(() => {
        $location.path("/start");
      });
    };

  });
