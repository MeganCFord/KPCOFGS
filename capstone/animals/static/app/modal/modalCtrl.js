angular.module("Ident")
  .controller("modalController", [
    "$scope",
    "$uibModalInstance",
    "$timeout", 
    "data", //all the pictures/etc for the selected animal. 
    "selectbutton", //Boolean of whether to show the 'select taxa' button on this modal instance.
    "$sce",
    function($scope, $uibModalInstance, $timeout, data, selectbutton, $sce) {
      // UIB modals require a controllerAs.
      const modalController = this;

      // Activates/hides the 'select taxa' button based on where the modal was instantiated from.
      modalController.selectable = selectbutton;
      // What picture to start the image carousel on.
      $scope.active = 0;

      modalController.data= data;
    
      // Runs to make any HTML description text show correctly. 
      $scope.renderHtml = function(code) {
        return $sce.trustAsHtml(code);
      };

      modalController.ok = function (nameToSend) {
        // Emits the selected taxa to the tree when activated.
        $scope.$emit("modalPickedTaxa", nameToSend);
        $uibModalInstance.close();

      };

      modalController.cancel = function () {
        // Closes the modal, doing nothing.
        $uibModalInstance.dismiss("cancel");
      };

    }]);
