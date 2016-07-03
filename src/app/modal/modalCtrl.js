angular.module("Ident")
  .controller("modalController", function($scope, $uibModalInstance, data, $sce) {
    const modalController = this;

    modalController.data= data;
    console.log("Controller data", data );

    //runs to make any HTML description text show correctly. 
    $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
    };

    $scope.active = 0;


    modalController.ok = function (nameToSend) {
      $scope.$emit("modalPickedTaxa", nameToSend);
      $uibModalInstance.close();

    };


    modalController.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

  });
