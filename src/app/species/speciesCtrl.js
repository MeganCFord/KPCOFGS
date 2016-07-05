angular.module("Ident")
  .controller("Species", function($timeout, UserObjectFactory, FeedFactory, TreeFactory, $scope, $sce, $location) {
    const species = this;

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

    species.publishableAnimal = null;

    species.loadcurrentTaxa = () => {
      $timeout().then(() => {species.currentTaxa = TreeFactory.getLoadedCurrentTaxa();
        console.log("species.currentTaxa", species.currentTaxa);
        return species.currentTaxa;
      }).then(() => {
        //emits to parent scope for navbar coloration.
        $scope.$emit("settingCurrentRank", species.currentTaxa.rank);
      });
    };
    species.loadcurrentTaxa();


    species.goBackButton = () => {
        $location.path(`/tree/${species.currentTaxa.classification[species.currentTaxa.classification.length-1].name}`);
    };

    species.publishAnimal = () => {
      $timeout().then(()=> {
        return FeedFactory.publishAnimal(species.publishableAnimal.name);
      })
      .then(() => {
        $location.path("/start");
      });
    };

  });
