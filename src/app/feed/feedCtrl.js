angular.module("Ident")
  .controller("FeedCtrl", function($timeout, FeedFactory) {
    const feed = this;


    feed.getFeed = () => {
      console.log("starting to get feed.");
      $timeout().then(()=>{feed.feed = FeedFactory.getFeed();
      console.log("feed", feed.feed );});
    };
    feed.getFeed();

  });
