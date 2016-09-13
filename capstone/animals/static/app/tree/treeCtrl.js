angular.module("Ident")
  .controller("Tree", [
    "TreeFactory", 
    "ModalFactory", 
    "$scope", 
    "$rootScope", 
    "$uibModal", 
    "$location", 
    "$timeout",
    function(TreeFactory, ModalFactory, $scope, $rootScope, $uibModal, $location, $timeout) {

      //main tree object, loading all sub and super taxa accordingly.
      $scope.taxa = TreeFactory.gimmeTheTree();

      //The subtaxa that gets selected/passed to tree traversal.
      $scope.selectedSubtaxa = null;

      //filter for firebase data questions vs no question.
      $scope.primary = true;

      //emit tree rank on page load for background.
      $scope.$emit("settingCurrentRank", $scope.taxa.rank);

      $scope.switchPrimary = function() {
        $scope.primary = !$scope.primary;
      };

      $scope.setsubtaxa = (name) => {
        $scope.selectedSubtaxa = name;
      };

      $scope.resetsubtaxa = () => {
        $scope.selectedSubtaxa = null;
      };

      // Filter that handles which cards to show based on whether I wrote a question for them.
      $scope.notDisabled = function(item) {
        if ($scope.primary === true) {
          return (item.question !== "");
        } else if ($scope.primary === false) {
          return (item.question === "");
        }
      };
     
      //loads next page on submit button click. In a function because it's technically a form submit.
      $scope.traverse = () => { 
        if ($scope.taxa.rank ==="Order" || $scope.taxa.rank === "Superfamily"){
          $location.path(`/species/${$scope.selectedSubtaxa}`);
        } else {
          $location.path(`/tree/${$scope.selectedSubtaxa}`);
        }
      };

      $scope.openModal = (scientificName) => {
        const modalInstance = $uibModal.open({
          size: "lg",
          templateUrl: "../../static/app/modal/infoModal.html", 
          controller: "modalController",
          controllerAs: "modalController", 
          resolve: { 
            data: function (ModalFactory) {
              return ModalFactory.populateModal(scientificName);
            },
            selectbutton: true
          }  
        });
      }; 

      //grabs the data from the modal "select this taxa" button.
      $rootScope.$on("modalPickedTaxa", function(event, value) { 
        $scope.taxa.childtaxa.forEach(function(child) {
          if (child.name === value) {
            $scope.selectedSubtaxa = child.name;
          }
        });
      });

      $scope.goBackButton = () => {
        $scope.selectedSubtaxa = null;
        console.log($scope.taxa.supertaxa);
        if ($scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1] != undefined) {
          $location.path(`/tree/${$scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1].name}`);
        } else {
          $location.path('/tree/Animalia');
        }


      };

    }]);
