angular.module("Ident")
  .controller("FeedCtrl", function($timeout, FeedFactory) {
    const feed = this;

    //runs on page load. $http GETTER runs as part of resolve in router.
    feed.getLoadedFeed = () => {
      $timeout().then(()=>{feed.feed = FeedFactory.getLoadedFeed();
      console.log("feed object from firebase", feed.feed );});
    };
    feed.getLoadedFeed();

    //TODO: add function that makes 'more info' button open species modal. 

  });
