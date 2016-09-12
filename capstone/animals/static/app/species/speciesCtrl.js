angular.module("Ident")
  .controller("Species", function($timeout, UserObjectFactory, FeedFactory, TreeFactory, $scope, $sce, $location) {

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

    $scope.species = TreeFactory.gimmeTheTree()


    $scope.goBackButton = () => {
      $scope.selectedSubtaxa = null;
      if ($scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1] != undefined) {
        $location.path(`/tree/${$scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1].name}`);
      } else {
        $location.path('/tree/Animalia');
      }
    };

    // $scope.publishAnimal = () => {
    //   $timeout().then(()=> {
    //     return FeedFactory.publishAnimal(species.publishableAnimal.name);
    //   })
    //   .then(() => {
    //     $location.path("/start");
    //   });
    // };

  });
