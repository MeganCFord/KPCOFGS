angular.module("Ident")
  .factory("FeedFactory", function($http, $timeout, UserObjectFactory ) {

    //these three functions run on start page to get the feed. 
    let feedgetter = $http.get("https://animal-identification.firebaseio.com/feed/.json");

    //TODO: get the common name of the species here- instead of the scientific name. Description will go on the back of the card if at all. 
    function publishAnimaltoFeed(name) {
      $timeout().then(()=> {
        const animalToPublish= UserObjectFactory.getLoadedUserAnimal();
        return animalToPublish;
      })
        .then((userAnimal)=> {
        console.log("starting to post." );
        //timestamps the upload for sorting purposes.
        const x = new Date();
        const myDate = x.toString();

        return $http({
          method: "POST", 
          url: `https://animal-identification.firebaseio.com/feed/.json`,
          data: {sortableDate: x, name: name, picture: userAnimal.url, description: userAnimal.description, date: myDate}
        }).then((res) => {
          console.log("finished posting." );
          return Promise.resolve();
        }, (e) => {
          return Promise.reject(e);
        });
      });
    }

    //public functions
    return {
      publishAnimal: publishAnimaltoFeed, 
      getPublishedAnimals: () => {
        return feedgetter
          .then(
            res => res.data, 
            e => console.log("get published animals error", e)
          );
      } //getPublishedAnimals

    };
  });
