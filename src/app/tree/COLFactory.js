angular.module("Ident")
  .factory("COLFactory", function($http, FirebaseFactory) {

    let currentTaxaData = null;

    function getCurrentTaxa () {
      return currentTaxaData;
    }

    function COLforTaxa (nameToSend) {
      console.log("COLforTaxa Data", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        //species objects don't have a 'results' object. 
        //TODO: set a 'isSpecies' variable to true or false based on this ternary as well.
        currentTaxaData = res.data.results ? 
           res.data.results[0] : res.data;
           
        if (currentTaxaData.child_taxa[0].rank === "Genus") {
          currentTaxaData.traversable = false;
        } else {
          currentTaxaData.traversable = true;
        }
        return currentTaxaData;
      
      }, (e) => {
        console.err(e);
        //
      }).then((data) => {
        if (data.traversable ===true) {
          return Promise.all(data.child_taxa.map((cardInfo) => {
            return FirebaseFactory.getSpecialData(cardInfo.name)
            .then((res) => {
              cardInfo.specialData = res;
              return cardInfo;
            });//end of firebaseFactory .then
          })).then(() => {
            return data;
          });//end of .then for promise.all
        }//end of if at species statement.

        //KEEP THIS HERE. 
        return Promise.resolve(data);
        // 
      }).then((data) => {
        currentTaxaData = data;
        return currentTaxaData;
      });//end of .then. 
    }//end of COLforTaxa



     
    
    //public functions
    return {
      COLforTaxa: COLforTaxa, 
      getCurrentTaxa: getCurrentTaxa
      
    };//end of return

  }); //end of factory
