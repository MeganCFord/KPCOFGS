angular.module("Ident")
  .factory("FeedFactory", function($http) {

    //these three functions run on start page to get the feed. 
    let feed = {};

    function publishAnimal(name, picture, description) {
      return $http ({
        method: "POST", 
        url: `https://animal-identification.firebaseio.com/feed/.json`,
        data: {name: name, picture: picture, description: description}
      }).then((res) => {
        return res.data;
      }, (e) => {
        console.log("error", e );
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
