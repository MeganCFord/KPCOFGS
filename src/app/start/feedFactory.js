angular.module("Ident")
  .factory("FeedFactory", function($http, FirebaseFactory, $timeout) {

    //these three functions run on start page to get the feed. 
    let feed = {};

    function publishAnimal(name) {
      return FirebaseFactory.getUserObject()
      .then((userAnimal)=> {
        return $http({
          method: "POST", 
          url: `https://animal-identification.firebaseio.com/feed/.json`,
          data: {name: name, picture: userAnimal.url, description: userAnimal.description}
        }).then((res) => {
          console.log("finished publishing animal");
          return Promise.resolve(res);
        }, (e) => {
          console.log("error", e );
          return Promise.reject(e);
        });
      });
    }

    function getPublishedAnimals() {
      return $http({
        method: "GET", 
        url: "https://animal-identification.firebaseio.com/feed/.json"
      }).then((res)=> {
        feed = res.data;
        return feed;
      }, (e)=> {
        console.log("error", e );
      });
    }

    function getFeed() {
      return feed;
    }

    return {
      publishAnimal: publishAnimal, 
      getPublishedAnimals: getPublishedAnimals, 
      getFeed: getFeed
    };



  });
