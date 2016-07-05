angular.module("Ident")
  .controller("FeedCtrl", function($timeout, $uibModal, FeedFactory) {
    const feed = this;
    feed.feed=[];
    //runs on page load. $http GETTER runs as part of resolve in router.
    feed.getLoadedFeed = () => {
      $timeout().then(()=>{feed.tempFeed = FeedFactory.getPublishedAnimals();
        return feed.tempFeed;
      }).then((res)=> {
        for (item in res) {
          feed.feed.push(res[item]);
        }
        console.log("feed should now be an array", feed.feed);
        return feed.feed;
      });
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
          buttons: false
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal
  });
