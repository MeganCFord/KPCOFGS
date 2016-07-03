angular.module("Ident")
  .factory("InfoFactory", function($http) {

    const stockModalInfo = {
      textStuff: ["this animal doesn't have any collegiate data stored. Try Wikipedia!"],
      stock: true
    };

    function populateTaxaCard (nameToSend) {
      console.log("name I'm sending", nameToSend );
      return $http({
        method: "GET", 
        url: `http://eol.org/api/search/1.0.json?q=${nameToSend}&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=`
      }).then((res) => {
        return (res.data.results[0]? res.data.results[0].id : stockModalInfo);
      }, (e) => {
        console.log("error", e );
      })//end of resolve/reject
      .then((currentEolId)=> {
        if (currentEolId.stock === true) {
          return currentEolId;
        } else {
          return EOLforCommonInfo(currentEolId)
          .then((data) => parseCommonInfo(data));//end of .then;
        }
      });
      
    }//end of populateTaxaCard


    function EOLforCommonInfo(idToSend) {
      return $http({
        method: "GET", 
        url: `http://eol.org/api/pages/1.0.json?batch=false&id=${idToSend}&images_per_page=10&images_page=1&videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0&maps_page=0&texts_per_page=2&texts_page=1&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=true&references=false&taxonomy=false&vetted=0&cache_ttl=&language=en`
      }).then((res) => {
        return res.data;
      }, (e) => {
        console.log("error", e );
      });//end of resolve/reject
    }//end of EOLforCommonInfo


    function parseCommonInfo(subtaxa) {
      return new Promise(function(resolve) {
        subtaxa.textStuff = [];
        subtaxa.pictures = [];

        subtaxa.vernacularNames.forEach((name) => {
          if(name.language === "en" && name.eol_preferred=== true) {
            subtaxa.commonName = name.vernacularName;
          }//end of if-else
        });//end of vernacularname forEach 

        subtaxa.dataObjects.forEach((object) => {
          if (object.mimeType === "text/plain" || object.mimeType === "text/html") {
            subtaxa.textStuff.push( object.description);
          } 
          if (object.mimeType === "image/jpeg") {
          
            checkIfPictureLoads(object.mediaURL)
            .then((res)=> {
              if (res === true) {
                subtaxa.pictures.push( object.mediaURL);
              }
              return subtaxa;
            });
          }//end of if-else

        });//end of dataObjects forEach
        
        resolve(subtaxa);
      });//end of promise
    }//end of parseCommonInfo

    function checkIfPictureLoads(address) {
      return $http({
        method: "GET", 
        url: address
      }).then((res) => {
        return true;
      }, (e) => {
        return false;
      });
    }

    //public functions.
    return {
      populateTaxaCard: populateTaxaCard
    };

  });//end of factory
