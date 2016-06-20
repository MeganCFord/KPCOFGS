angular.module("Ident")
  .factory("InfoFactory", function($http) {

    function populateTaxaCard (nameToSend) {
      return $http({
        method: "GET", 
        url: `http://eol.org/api/search/1.0.json?q=${nameToSend}&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=`
      }).then((res) => {
        return (res.data.results[0].id? res.data.results[0].id : res.data);
      }, (e) => {
        console.log("error", e );
      })//end of resolve/reject
      .then((currentEolId)=> {
        return EOLforCommonInfo(currentEolId);
      })
      .then((data) => parseCommonInfo(data));//end of .then
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
      // console.log("parser is starting" );
        // console.log("object", subtaxa);
        subtaxa.textStuff = [];
        subtaxa.pictures = [];

        subtaxa.vernacularNames.forEach((name) => {
          if(name.language === "en" && name.eol_preferred=== true) {
            //TODO: add this in later. basically a QC to make the modal info prettier, but not absolutely necessary at this point.
            // subtaxa.commonName = checkName(name.vernacularName);
          }//end of if-else
        });//end of vernacularname forEach 

        subtaxa.dataObjects.forEach((object) => {
          if (object.mimeType === "text/plain" || object.mimeType === "text/html") {
            subtaxa.textStuff.push( object.description);
          } 
          if (object.mimeType === "image/jpeg") {
            //I need to run a function somewhere that filters this array- runs a GET and if it returns success, add it to the 'pictures' array, and if not do nothing. 
            subtaxa.pictures.push( object.mediaURL);
          }//end of if-else

        });//end of dataObjects forEach
        
        resolve(subtaxa);
      });//end of promise
    }//end of parseCommonInfo

    // //TODO: make this a firebase call. Add in later maybe.
    // function checkName(name) {
    //   let correctName = "";
    //   switch(name) {
    //   case "tuataras":
    //     correctName = "Tuatara";
    //     break;
    //   default:
    //     correctName = name;
    //   }
    //   return correctName;

    // }


    //public functions.
    return {
      populateTaxaCard: populateTaxaCard
    };


  });//end of factory