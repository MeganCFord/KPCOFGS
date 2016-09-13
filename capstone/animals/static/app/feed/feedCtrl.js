angular.module("Ident")
  .controller("FeedCtrl", [
    "$timeout", 
    "$scope", 
    "$uibModal", 
    "FeedFactory", 
    function($timeout, $scope, $uibModal, FeedFactory) {
    
      $scope.feed=[];
      //Get firebase feed on page load.
      FeedFactory.getPublishedAnimals()
        .then((res)=>{
          // turn the feed object into an array for sorting by date in feed.html.
          for (key in res) {
            $scope.feed.push(res[key]);
            $timeout();
          }
        });

      // Open and populate info modal.
      $scope.openModal = (scientificName) => {
        const modalInstance = $uibModal.open({
          size: "lg",
          templateUrl: "/animals/static/app/modal/infoModal.html", 
          controller: "modalController",
          controllerAs: "modalController", 
          resolve: { 
            data: function (ModalFactory) {
              return ModalFactory.populateModal(scientificName);
            }, 
            selectbutton: false
          }//end of resolve  
        });//end of modal.open
      }; 

      //reformat published dates into a pipe-able string for Angular filter. 
      $scope.formatDate = (date) => {
        return new Date(date);
      };

    }]);
