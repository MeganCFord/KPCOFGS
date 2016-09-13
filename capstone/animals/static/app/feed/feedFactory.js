angular.module("Ident")
  .factory("FeedFactory", function($http) {

    return {
      getPublishedAnimals: () => {
        return $http.get("https://animal-identification.firebaseio.com/feed/.json")
          .then(
            res => res.data, 
            e => console.log("get published animals error", e)
          );
      }
    };
  });
