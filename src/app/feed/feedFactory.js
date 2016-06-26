angular.module("Ident")
  .factory("FeedFactory", function($http, FirebaseFactory ) {

    //these three functions run on start page to get the feed. 
    let feed = {};

    function publishAnimal(name) {
      return FirebaseFactory.getUserObject()
      .then((userAnimal)=> {
        return $http({
          method: "POST", 
          url: `https://animal-identification.firebaseio.com/feed/.json`,
          //TODO: get the common name of the species here- instead of the scientific name. Description will go on the back of the card if at all. 
          data: {name: name, picture: userAnimal.url, description: userAnimal.description}
        }).then((res) => {
          return Promise.resolve(res);
        }, (e) => {
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
        return Promise.reject(e);
      });
    }

    function getFeed() {
      return feed;
    }


    //public functions
    return {
      publishAnimal: publishAnimal, 
      getPublishedAnimals: getPublishedAnimals, 
      getFeed: getFeed
    };

  });
