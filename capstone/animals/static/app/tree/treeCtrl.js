angular.module("Ident")
  .controller("Tree", [
    "TreeFactory", 
    "ModalFactory", 
    "$scope", 
    "$rootScope", 
    "$uibModal", 
    "$route", 
    "$location", 
    "$timeout",
    function(TreeFactory, ModalFactory, $scope, $rootScope, $uibModal, $route, $location, $timeout) {

      $scope.currentTaxaName = $route.current.params.taxa;
      //main tree object, loading all sub and super taxa accordingly.
      $scope.taxa = null;
      //The subtaxa that gets selected/passed to tree traversal.
      $scope.selectedSubtaxa = null;

      //filter for firebase data questions vs no question.
      $scope.primary = true;

      //get tree object on page load.
      TreeFactory.loadTree($scope.currentTaxaName)
        .then((res) => {
          $scope.taxa = res.data;
          $scope.$emit("settingCurrentRank", $scope.taxa.rank);
          $timeout();
        });


      $scope.notDisabled = function(item) {
        if ($scope.primary === true) {
          console.log("primary is true", item.question );
          return (item.question !== "");
        } else if ($scope.primary === false) {
          console.log("primary is false", item.question);
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

