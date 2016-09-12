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

      //get tree object on page load.
      TreeFactory.loadTree($scope.currentTaxaName)
        .then((res) => {
          console.log("loaded tree. here's what's in it.", res.data);
          $scope.taxa = res.data;
          $scope.$emit("settingCurrentRank", $scope.taxa.rank);
        });


      //filter for my firebase data questions.
      $scope.primary = true;
      $scope.notDisabled = function(item) {
        if ($scope.primary === true) {
          return (item.specialData && item.specialData.enableMe === true);
        } else {
          return (item.specialData && item.specialData.enableMe === false);
        }
      };
     

      //loads next page on submit button click. In a function because it's technically a form submit.
      $scope.traverse = () => { 
        $timeout()
          .then(()=> {
            if ($scope.selectedSubtaxa.rank==="Family"){
              $location.path(`/species/${$scope.selectedSubtaxa.name}`);
            } else {
              $location.path(`/tree/${$scope.selectedSubtaxa.name}`);
            }
          });
      };

      //grabs the data from the modal "select this taxa" button.
      $rootScope.$on("modalPickedTaxa", function(event, value) { 
        $scope.currentTaxa.child_taxa.forEach(function(child) {
          if (child.name === value) {
            $scope.selectedSubtaxa = child;
          }
        });
      });
   

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
            buttons: true
          }  
        });
      }; 

      $scope.goBackButton = () => {
        $scope.selectedSubtaxa = null;
        $location.path(`/tree/${$scope.taxa.classification[$scope.taxa.classification.length - 1].name}`);
      };

    }]);

