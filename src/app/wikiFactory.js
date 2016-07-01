 angular.module("Ident")
  .factory("WikiFactory", function($http) {
    let wikiData = {
      names: [],
      text: [], 
      images: []
    };

    function getWikiData(title) {
      return $http({
        method: "GET", 
        url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&format=json`
      })
        .then((res)=> {
          wikidata.names = res.data[1];
          wikiData.text = res.data[2];
          wikiData.images = res.data[3];
          console.log("wikidata", wikiData );
        }, (e) => {
          console.log("error", e);
        });

    }//end of getWikiData


    //public functions
    return {
      getWikiData: getWikiData
    };


  });
