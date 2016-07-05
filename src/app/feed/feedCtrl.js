angular.module("Ident")
  .controller("FeedCtrl", function($timeout, $uibModal, FeedFactory) {
    const feed = this;

    //runs on page load. $http GETTER runs as part of resolve in router.
    feed.getLoadedFeed = () => {
      $timeout().then(()=>{feed.feed = FeedFactory.getLoadedFeed();
      console.log("feed object from firebase", feed.feed );});
    };
    feed.getLoadedFeed();


    feed.openModal = (scientificName) => {
      const modalInstance = $uibModal.open({
        size: "lg",
        templateUrl: "app/modal/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (InfoFactory) {
            return InfoFactory.populateTaxaCard(scientificName);
          }, 
          buttons: "not sure what's going here yet"
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal
  });
