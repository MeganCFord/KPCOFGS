angular.module("Ident")
  .factory("COLFactory", function($http) {

    let currentTaxa = {};

    //pulled the function out of the return statement so I could put other functions into it. 
    function COLforTaxa (nameToSend) {
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {

        //this Ternary is probably a temporary solution. I need to run two different functions here based on whether the return data is a species or not. if it is a species, run a wikipedia search. if it is not a species, run a EOL search for some media and narrow down the approved options. 
        
        res.data.results ? 
          currentTaxa = res.data.results[0] : currentTaxa = res.data;
        return currentTaxa;
      }, (e) => {
        console.log("error", e );
      });//end of .then
    }//end of COLforTaxa

    return {

      COLforTaxa: COLforTaxa
     
    };//end of return
  }); //end of factory
