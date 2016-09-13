angular.module("Ident")
  .controller("UserObject", function(TreeFactory, UserObjectFactory, $scope, $timeout, $uibModal) {

    $scope.animalObject = TreeFactory.gimmeTheTree();

    $scope.userInfo = {};

    UserObjectFactory.getUserObject()
      .then((res) => {
        $scope.userInfo = res.data;
        $timeout();
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
          selectbutton: false
        }  
      });
    }; 


  });//end of controller
