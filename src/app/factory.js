angular.module("Ident")
  .factory("COLFactory", function($http) {

    let currentCommonInfo = [];


    //pulled the function out of the return statement so I could put other functions into it. 
    function COLforTaxa (nameToSend) {
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        //species objects don't have 'results' object.
        return (res.data.results ? 
           res.data.results[0] : res.data);
      
      }, (e) => {
        console.err(e);
      });//end of .then. 
    }//end of COLforTaxa


    function EOLforID (nameToSend) {
        return $http({
          method: "GET", 
          url: `http://eol.org/api/search/1.0.json?q=${nameToSend}&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=`
        }).then((res) => {
          return res.data.results[0].id;
        }, (e) => {
          console.log("error", e );
        })
        .then((currentEolId)=> {
          return EOLforCommonInfo(currentEolId);
        });
    }//end of EOL for Id


    function EOLforCommonInfo(idToSend) {
      return $http({
        method: "GET", 
        url: `http://eol.org/api/pages/1.0.json?batch=false&id=${idToSend}&images_per_page=1&images_page=1&videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0&maps_page=0&texts_per_page=2&texts_page=1&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=true&references=false&taxonomy=false&vetted=0&cache_ttl=&language=en`
      }).then((res) => {
        return res.data;
      }, (e) => {
        console.log("error", e );
      });
    }
    return {

      COLforTaxa: COLforTaxa, 
      EOLforID: EOLforID, 
      EOLforCommonInfo: EOLforCommonInfo
     
    };//end of return
  }); //end of factory
