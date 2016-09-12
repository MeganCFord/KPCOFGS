angular.module("Ident")
  .controller("Tree", [
    "TreeFactory", 
    "ModalFactory", 
    "$scope", 
    "$rootScope", 
    "$uibModal", 
    "$location", 
    function(TreeFactory, ModalFactory, $scope, $rootScope, $uibModal, $location) {

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


      $scope.notDisabled = function(item) {
        if ($scope.primary === true) {
          return (item.question !== "");
        } else if ($scope.primary === false) {
          return (item.question === "");
        }
      };
     

      //loads next page on submit button click. In a function because it's technically a form submit.
      $scope.traverse = () => { 
        if ($scope.selectedSubtaxa.rank==="Family"){
          $location.path(`/species/${$scope.selectedSubtaxa.name}`);
        } else {
          $location.path(`/tree/${$scope.selectedSubtaxa.name}`);
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
            $scope.selectedSubtaxa = child;
          }
        });
      });

      $scope.goBackButton = () => {
        $scope.selectedSubtaxa = null;
        $location.path(`/tree/${$scope.taxa.supertaxa[$scope.taxa.supertaxa.length - 1].name}`);
      };

    }]);
