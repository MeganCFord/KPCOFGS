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



    // //TODO: make this ok button connect to the appropriate radio button.

    // modalController.ok = function (nameToSend) {
    //   $scope.$id($9).tree.mySubtaxa = nameToSend;
    //   $uibModalInstance.close();

    // };


    modalController.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

  });
