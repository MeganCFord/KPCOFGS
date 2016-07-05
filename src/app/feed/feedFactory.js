angular.module("Ident")
  .factory("FeedFactory", function($http, $timeout, UserObjectFactory ) {

    //these three functions run on start page to get the feed. 
    let feed = {};

    //TODO: get the common name of the species here- instead of the scientific name. Description will go on the back of the card if at all. 
    function publishAnimaltoFeed(name) {
      $timeout().then(()=>{return UserObjectFactory.getLoadedUserAnimal();})
      .then((userAnimal)=> {
        
        //timestamps the upload for sorting purposes.
        const x = new Date();
        const myDate = x.toString();

        return $http({
          method: "POST", 
          url: `https://animal-identification.firebaseio.com/feed/.json`,
          data: {name: name, picture: userAnimal.url, description: userAnimal.description, date: myDate}
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

    function getLoadedFeed() {
      return feed;
    }


    //public functions
    return {
      publishAnimal: publishAnimaltoFeed, 
      getPublishedAnimals: getPublishedAnimals, 
      getLoadedFeed: getLoadedFeed
    };

  });
