angular.module("Ident")
  .controller("Species", function($timeout, UserObjectFactory, FeedFactory, ModalFactory, TreeFactory, $scope, $sce, $location) {


    $scope.publishableAnimal = null;
    $scope.species = TreeFactory.gimmeTheTree();

    // Gets each modal data promise separately after page load, to speed up info display.
    $scope.Modalpromises = $scope.species.childtaxa.map((magic) => {
      return ModalFactory.populateModal(magic.name).then((res) => {

        for (taxa in $scope.species.childtaxa) {
          if ($scope.species.childtaxa[taxa].name === magic.name) {
            $scope.species.childtaxa[taxa].modalData = {};
            $scope.species.childtaxa[taxa].modalData = res;
          }
        }
        $timeout();
      });
    });

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

    $scope.setpublishableAnimal = (name) => {
      $scope.publishableAnimal = name;

    };

    $scope.goBackButton = () => {
      $scope.publishableAnimal = null;
      if ($scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1] != undefined) {
        $location.path(`/tree/${$scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1].name}`);
      } else {
        $location.path("/tree/Animalia");
      }
    };

    $scope.publishAnimal = () => {
      return UserObjectFactory.publishAnimal($scope.publishableAnimal)
        .then(() => {
          $location.path("/start");
        });
    };

  });
